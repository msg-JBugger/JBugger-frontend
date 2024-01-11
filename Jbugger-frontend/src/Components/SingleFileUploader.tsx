import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");
  const { bugId } = useParams();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setStatus("uploading");

      try {
        const jwt = localStorage.getItem("jwt");
        const fileName = file.name;
        const byteArray = await readFileAsByteArray(file);
        const fileInfo = {
          attachmentFilename: fileName,
          attachmentContent: byteArray,
        };
        const result = await axios.post(
          import.meta.env.VITE_SERVER_ADDRESS +
            import.meta.env.VITE_SERVER_PORT +
            `api/bug/addAtachment/${bugId}`,
          fileInfo,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const data = result.data;

        console.log(data);
        setStatus("success");
      } catch (error) {
        console.error("Error details:", error);
        setStatus("fail");
      }
    }
  };

  function readFileAsByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          const result = event.target.result as ArrayBuffer;
          const byteArray = new Uint8Array(result);
          resolve(byteArray);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  return (
    <>
      <div className="input-group">
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button
          onClick={handleUpload}
          className="submit btn btn-primary btn-lg my-custom-button"
        >
          Upload a file
        </button>
      )}

      <Result status={status} />
    </>
  );
};

const Result = ({ status }: { status: string }) => {
  if (status === "success") {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};

export default SingleFileUploader;
