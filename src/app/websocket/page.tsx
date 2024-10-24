"use client";

import { useEffect, useState, useRef } from "react";
import { socket } from "../../socket";

type Appointment = {
  id: string;
  name: string;
};

export default function Home() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    function appointmentUpdate(appointment: Appointment) {
      setAppointments((prevAppointments) => [...prevAppointments, appointment]);
    }

    socket.on("appointmentUpdate", appointmentUpdate);

    return () => {
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
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <button onClick={handleSendAppointment}>Send Appointment</button>
      {appointments.map((appointment) => (
        <div key={appointment.id}>{appointment.name}</div>
      ))}
    </div>
  );
}
