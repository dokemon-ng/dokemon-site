import { traefikConfig } from "../../constants/commands";

export default function ExtraContent() {
  return (
    <div className="flex flex-col items-center dark:text-white">
      <div className="mb-16 w-full text-center px-4 md:px-0">
        <h3 className="text-xl font-bold mb-4">
          Production Usage
        </h3>
        <p className="mb-4 text-base text-gray-700 dark:text-gray-300">
          We recommend that you run Dokémon on a private network whenever
          possible.
        </p>
        <p className="mb-6 text-base text-gray-700 dark:text-gray-300">
          If you are running on a VPS with only public access, we recommend
          that you use an SSL enabled reverse proxy in front of Dokémon. Using Traefik with LetsEncrypt SSL certificate
        </p>

        <h4 className="text-lg font-semibold mb-2">Traefik Configuration Example:</h4>
        <p className="mb-4 text-base text-gray-700 dark:text-gray-300">
          This is an example configuration for running Dokémon behind Traefik with LetsEncrypt SSL certificate.
          <br /><br />
          Note: This is a sample configuration. Please modify it as per your requirements.
        </p>

        <div className="mb-4 w-full text-left">
          <pre className="bg-gray-100 dark:bg-slate-800 p-4 text-sm font-mono overflow-x-auto rounded text-gray-800 dark:text-gray-200">
            {traefikConfig}
          </pre>
        </div>

        <div className="mb-8 flex justify-center">
          <button
            type="button"
            className="w-24 rounded-md bg-amber-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            onClick={() => {
              navigator.clipboard.writeText(traefikConfig);
            }}
          >
            Copy
          </button>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Deployment Instructions:</h4>
          <ol className="list-decimal pl-5 space-y-2 max-w-xl mx-auto text-base text-left text-gray-700 dark:text-gray-300">
            <li>In the DNS settings for your domain, add an A record for the Host which you have mentioned in the above config</li>
            <li>The A record should point to the public IP address of your virtual machine</li>
            <li>Create a file named compose.yaml on your server</li>
            <li>Copy and paste the above YAML definition into the file</li>
            <li>Modify the email and host. Make any other changes as per your requirements</li>
            <li>Run <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">mkdir ./letsencrypt && mkdir /dokemondata</code></li>
            <li>Run <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">docker compose up -d</code></li>
            <li>Open <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">https://dokemon.example.com</code> (substitute your URL here) in the browser</li>
          </ol>
          <p className="mt-4 text-base text-gray-700 dark:text-gray-300">
            It can take a few seconds for the SSL certificate to be provisioned. If you get an error related to SSL, please wait for a few moments and then refresh your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
