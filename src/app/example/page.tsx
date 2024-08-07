"use client";
import { useEffect, useState } from "react";
//import { Page } from "../components/Page";
//import { _ } from "../localization/Localization";
//import { showToast } from "../ui_utils";
import ky from "ky";
import { RowApiExample } from "./RowApiExample";
//import { Link } from "react-router-dom";
import Link from "next/link";
import { RowStorageExample } from "./RowStorageExample";
import { RowStorageExampleSession } from "./RowStorageExampleSession";
import { AArrowDown, AArrowUp } from "lucide-react";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { toast, useToast } from "@/components/ui/use-toast";

function _(val: String) {
  return val;
}

export type TipoNotifica =
  | "success"
  | "destructive"
  | "warning"
  | "info"
  | "default";
var t = 0;
let timer: NodeJS.Timeout;
export default function Esempi() {
  //props: { title: string; subtitle?: string }) {
  //const { title, subtitle } = props;
  const [tipoNotifica, setTipoNotifica] = useState<TipoNotifica>("success");
  const [url, setUrl] = useState<string>(
    "https://jsonplaceholder.typicode.com/posts/1",
  );
  const files: File[] = [];
  const [label, setLabel] = useState<string>();
  const [counter, setCounter] = useState<number>(1);
  /*
  Il primo useEffect non ha dipendenze, il che significa che verrà eseguito solo una volta quando il componente viene montato. Il ritorno di una funzione di pulizia che viene eseguita quando il componente viene smontato.
*/
  useEffect(() => {
    console.log("DashboardPage mounted");
    return () => {
      console.log("DashboardPage unmounted");
      stopInterval();
    };
  }, []);
  /*
Il secondo useEffect ha una dipendenza da counter, il che significa che verrà eseguito ogni volta che counter cambia. Inoltre, verrà eseguito anche la prima volta che il componente viene montato.
*/
  useEffect(() => {
    console.log("Counter changed: " + counter);
  }, [counter]);
  /*
Il terzo useEffect ha una dipendenza da tipoNotifica, il che significa che verrà eseguito ogni volta che tipoNotifica cambia. Inoltre, verrà eseguito anche la prima volta che il componente viene montato.
*/
  useEffect(() => {
    console.log("Tipo notifica changed: " + tipoNotifica);
  });

  async function invioFileConLabel(url: string) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("label", label || "");
    try {
      const response = await ky
        .post(url, {
          body: formData,
        })
        .json();
      console.log(response);
      Toaster();
      //showToast("Chiamata API eseguita con successo", "success");
    } catch (error) {
      console.error(error);
      //showToast("Errore durante la chiamata API", "error");
    }
  }

  async function richiestaBaseConKy(url: string): Promise<string> {
    try {
      const response = await ky.get(url).json();
      console.log(response);
      //showToast("Chiamata API eseguita con successo", "success");
      return JSON.stringify(response);
    } catch (error) {
      console.error(error);
      //showToast("Errore durante la chiamata API", "error");
    }
    return "";
  }

  async function richiestaGetConHeaderAuthorization(url: string) {
    try {
      const response = await ky
        .get(url, {
          headers: {
            Authorization: "Bearer token",
          },
        })
        .json();
      console.log(response);
      //showToast("Chiamata API eseguita con successo", "success");
      return JSON.stringify(response);
    } catch (error) {
      console.error(error);
      //showToast("Errore durante la chiamata API", "error");
    }
    return "";
  }

  async function richiestaPostConHeaderAuthorization(url: string) {
    try {
      const response = await ky
        .post(url, {
          headers: {
            Authorization: "Bearer token",
          },
          json: {
            id: 1,
            title: "...",
            body: "...",
            userId: 1,
          },
        })
        .json();
      console.log(response);

      //showToast("Chiamata API eseguita con successo", "success");
      return JSON.stringify(response);
    } catch (error) {
      console.error((error as any).message);
      //showToast((error as any).message, "error");
      //showToast("Errore durante la chiamata API", "error");
    }
    return "";
  }

  function startInterval() {
    timer = setInterval(() => {
      setCounter(t);
      t = t + 1;
      //showToast("Intervallo " + counter, "info");
      console.log("Intervallo " + counter);
      console.log("t: " + t);
    }, 1000);
  }

  function stopInterval() {
    clearInterval(timer);
  }
  //const { toast } = useToast();
  return (
    // <Page
    //   title={title}
    //   subtitle={subtitle}
    //   action={
    //     <div className="flex flex-row space-x-3">
    //       <button
    //         className="btn btn-primary shadow-md"
    //         onClick={() => {
    //           //showToast("Non implementato", "error");
    //         }}
    //       >
    //         <AArrowUp className="text-primary-content h-6 w-6" />
    //         <span className="hidden xl:flex">{_("Salva")}</span>
    //       </button>
    //       <button
    //         className="btn btn-primary shadow-md"
    //         onClick={() => {
    //           //showToast("Non implementato", "error");
    //         }}
    //       >
    //         <AArrowDown className="text-primary-content h-6 w-6" />
    //         <span className="hidden xl:flex">{_("Salva")}</span>
    //       </button>
    //     </div>
    //   }
    // >
    <div className="flex h-full w-full flex-col space-y-5">
      {/* <Link to="/diagnostica?title=Esempio&subtitle=Tutti gli esempi">
          Go to Dashboard
        </Link> */}
      <h1>Esempi</h1>
      <label className="label">{_("Notifica di prova")}</label>
      <div className="flex h-12 w-full flex-row space-x-5">
        <button
          className="btn btn-primary w-52"
          onClick={() => {
            toast({
              title: "Title",
              description: "description",
              variant: tipoNotifica,
              duration: 1000,
            });
            //showToast("Notifica di prova", tipoNotifica);
          }}
        >
          {_("Mostra notifica")}
        </button>
        <select
          className="select select-bordered w-52"
          onChange={(e) => setTipoNotifica(e.target.value as TipoNotifica)}
        >
          <option value="success">Success</option>
          <option value="destructive">Error</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
          <option value="default">Default</option>
        </select>
        <label className="label">{_("Durata")}</label>
        <input type="number" value="1000"></input>
      </div>
      <RowApiExample
        label="Senza Header Authorization"
        callback={richiestaBaseConKy}
      />
      <RowApiExample
        label="Con Header Authorization"
        callback={richiestaGetConHeaderAuthorization}
      />
      <RowApiExample
        label="Post con Header Authorization"
        callback={richiestaPostConHeaderAuthorization}
      />
      <RowStorageExample label="Esempio di utilizzo di local storage" />
      <RowStorageExampleSession label="Esempio di utilizzo di session storage" />
      <label className="label">{_("Contatore")}</label>
      <div className="flex h-12 w-full flex-row space-x-5">
        <button
          className="btn btn-primary w-52"
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          {_("Incrementa contatore")}
        </button>
        <button
          className="btn btn-primary w-52"
          onClick={() => {
            setCounter(counter - 1);
          }}
        >
          {_("Decrementa contatore")}
        </button>
        <button
          className="btn btn-primary w-52"
          onClick={() => {
            //showToast("Intervallo avviato", "info");
            startInterval();
          }}
        >
          {_("Avvia intervallo")}
        </button>
        <button
          className="btn btn-primary w-52"
          onClick={() => {
            //showToast("Intervallo fermato", "info");
            stopInterval();
          }}
        >
          {_("Ferma intervallo")}
        </button>
        <label className="label">{_("Contatore: " + counter)}</label>
      </div>
      <label className="label">{_("Esempio di invio di file con label")}</label>
      <div className="flex h-12 w-full flex-row space-x-5">
        <button
          className="btn btn-primary w-52"
          onClick={() => {
            invioFileConLabel(url);
          }}
        >
          {_("Invia file con label")}
        </button>
        <input type="file" onChange={(e) => files.push(e.target.files![0])} />
        <input
          className="input w-full"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
    </div>
    //</Page>
  );
}
