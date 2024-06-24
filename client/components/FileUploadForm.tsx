"use client";

import { uploadOfxFile } from "@/app/actions/actions";
import { useFormState } from "react-dom";

export default function FileUploadForm({ id: acctId }: { id: string }) {
  const [state, formAction] = useFormState(uploadOfxFile, { status: "" });
  return (
    <>
      <form action={formAction}>
        <input type="hidden" value={acctId} name={"id"} />
        <input type="file" id="file" name="file" />
        <label htmlFor="file">
          <button className="btn" type="submit">
            Upload MSMoney File
          </button>
        </label>
      </form>
    </>
  );
}
