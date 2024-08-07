import { useState } from "react";
//import { _ } from "../../localization/Localization";

function _(val: String) {
  return val;
}

export interface IRowApiExampleProps {
  callback: (url: string) => Promise<string>;
  label?: string;
}

export function RowApiExample(props: IRowApiExampleProps) {
  const { callback, label } = props;
  const [url, setUrl] = useState<string>(
    "https://jsonplaceholder.typicode.com/posts/1",
  );
  const [output, setOutput] = useState<string>("");

  return (
    <>
      <label className="label">{label || _("Non fornito")}</label>
      <div className="flex h-12 w-full flex-row space-x-5">
        <button
          className="btn btn-primary w-52"
          onClick={async () => {
            const o = await callback(url);
            setOutput(o);
          }}
        >
          {_("Esegui chiamata API")}
        </button>
        <input
          className="input w-full"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="flex h-full w-full flex-col">
        <label className="label">{_("Output")}</label>
        <textarea className="textarea h-52" value={output} readOnly />
      </div>
    </>
  );
}
