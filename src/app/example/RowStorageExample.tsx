import { useState } from "react";
//import { showToast } from "../../ui_utils";

//import { _ } from "../../localization/Localization";

function _(val: String) {
  return val;
}

export interface IRowStorageExampleProps {
  label?: string;
}

export function RowStorageExample(props: IRowStorageExampleProps) {
  const { label } = props;
  const [value, setValue] = useState<string>("");
  const [key, setKey] = useState<string>("");

  return (
    <>
      <label className="label">{label || _("Non fornito")}</label>
      <div className="flex h-12 w-full flex-row space-x-5">
        <button
          className="btn btn-primary w-52"
          onClick={async () => {
            localStorage.setItem(key, value);
          }}
        >
          {_("Esegui Salvataggio su local storage")}
        </button>
        <button
          className="btn btn-primary w-52"
          onClick={async () => {
            const v = localStorage.getItem(key);
            // if (v) showToast(v, "success");
            // else showToast("Chiave non trovata", "error");
          }}
        >
          {_("Esegui Lettura da local storage")}
        </button>
        <button
          className="btn btn-primary w-52"
          onClick={async () => {
            localStorage.removeItem(key);
          }}
        >
          {_("Esegui Rimozione da local storage")}
        </button>
        <input
          className="input w-full"
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          className="input w-full"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </>
  );
}
