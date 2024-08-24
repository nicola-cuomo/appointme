"use client";

import { useEffect, useState, useRef } from "react";
import { socket } from "../../socket";

type Appointment = {
    id: string;
    name: string;
};

export default function Home() {
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [name, setName] = useState("");

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
            });
        }

        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }

        function appointmentUpdate(appointment: Appointment) {
            setAppointments((prevAppointments) => [...prevAppointments, appointment]);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("appointmentUpdate", appointmentUpdate);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("appointmentUpdate", appointmentUpdate);
        };
    }, []);

    function handleSendAppointment() {
        const appointment = {
            id: Math.random().toString(36).slice(2),
            name,
        };
        socket.emit("newAppointment", appointment);
        setAppointments((prevAppointments) => [...prevAppointments, appointment]);
        setName("");
    }

    return (
        <div>
            <input type="text" value={name} onChange={(event => setName(event.currentTarget.value))} />
            <button onClick={handleSendAppointment}>
                Send Appointment
            </button>
            {appointments.map((appointment) => (
                <div key={appointment.id}>
                    {appointment.name}
                </div>
            ))}
        </div>
    );
}