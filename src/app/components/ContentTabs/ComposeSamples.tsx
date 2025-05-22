import { dokemonsiteCompose, piholeCompose, openspeedtestCompose } from "../../constants/composeSamples";

export default function ComposeSamples() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8 text-center">Compose Samples</h2>

      <div className="w-full mb-12 px-4 md:px-0">
        <h3 className="text-xl font-bold mb-4 text-center">DokémonWebsite</h3>
        <div className="mb-4 w-full">
          <pre className="bg-slate-800 p-4 text-sm font-mono overflow-x-auto rounded">
            {dokemonsiteCompose}
          </pre>
        </div>
        <div className="mb-8 flex justify-center">
          <button 
            type="button"
            className="w-24 rounded-md bg-amber-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            onClick={() => {
              navigator.clipboard.writeText(dokemonsiteCompose);
            }}
          >
            Copy
          </button>
        </div>
      </div>

      <div className="w-full mb-12 px-4 md:px-0">
        <h3 className="text-xl font-bold mb-4 text-center">OpenSpeedTest</h3>
        <div className="mb-4 w-full">
          <pre className="bg-slate-800 p-4 text-sm font-mono overflow-x-auto rounded">
            {openspeedtestCompose}
          </pre>
        </div>
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            className="w-24 rounded-md bg-amber-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            onClick={() => {
              navigator.clipboard.writeText(openspeedtestCompose);
            }}
          >
            Copy
          </button>
        </div>
      </div>

      <div className="w-full mb-12 px-4 md:px-0">
        <h3 className="text-xl font-bold mb-4 text-center">PiHole - Network-wide Ad Blocking</h3>
        <div className="mb-4 w-full">
          <pre className="bg-slate-800 p-4 text-sm font-mono overflow-x-auto rounded">
            {piholeCompose}
          </pre>
        </div>
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            className="w-24 rounded-md bg-amber-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            onClick={() => {
              navigator.clipboard.writeText(piholeCompose);
            }}
          >
            Copy
          </button>
        </div>
      </div>
      
    </div>
  );
}
