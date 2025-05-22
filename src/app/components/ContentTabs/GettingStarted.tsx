import { command, volumeCommand, compose, composeVolume } from "../../constants/commands";

export default function GettingStarted() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8 text-center">Getting Started with Dokémon</h2>

      <div className="w-full mb-12 px-4 md:px-0">
        <h3 className="text-xl font-bold mb-4 text-center">Directory Version</h3>
        <div className="mb-4 w-full">
          <pre className="bg-slate-800 p-4 text-sm font-mono overflow-x-auto rounded">
            {command}
          </pre>
        </div>
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            className="w-24 rounded-md bg-amber-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            onClick={() => {
              navigator.clipboard.writeText(command);
            }}
          >
            Copy
          </button>
        </div>
      </div>

      <div className="w-full mb-12 px-4 md:px-0">
        <h3 className="text-xl font-bold mb-4 text-center">Volume Version</h3>
        <div className="mb-4 w-full">
          <pre className="bg-slate-800 p-4 text-sm font-mono overflow-x-auto rounded">
            {volumeCommand}
          </pre>
        </div>
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            className="w-24 rounded-md bg-amber-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            onClick={() => {
              navigator.clipboard.writeText(volumeCommand);
            }}
          >
            Copy
          </button>
        </div>
      </div>

      <div className="w-full mb-12 px-4 md:px-0">
        <h3 className="text-xl font-bold mb-4 text-center">Docker Compose Directory Version</h3>
        <div className="mb-4 w-full">
          <pre className="bg-slate-800 p-4 text-sm font-mono overflow-x-auto rounded">
            {compose}
          </pre>
        </div>
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            className="w-24 rounded-md bg-amber-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            onClick={() => {
              navigator.clipboard.writeText(compose);
            }}
          >
            Copy
          </button>
        </div>
      </div>

      <div className="w-full mb-12 px-4 md:px-0">
        <h3 className="text-xl font-bold mb-4 text-center">Docker Compose Volume Version</h3>
        <div className="mb-4 w-full">
          <pre className="bg-slate-800 p-4 text-sm font-mono overflow-x-auto rounded">
            {composeVolume}
          </pre>
        </div>
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            className="w-24 rounded-md bg-amber-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            onClick={() => {
              navigator.clipboard.writeText(composeVolume);
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
