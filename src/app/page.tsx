"use client";

import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { useState } from "react";

// Define your menu items in a configurable array
const menuItems = [
  { id: 'main', title: 'Main' },
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'extra', title: 'Extra' },
  { id: 'faq', title: 'FAQ' }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('main');

  const command = `# Create directory to store Dokemon data
sudo mkdir /dokemondata

# Run Dokemon
sudo docker run -p 9090:9090 \\
      -v /dokemondata:/data \\
      -v /var/run/docker.sock:/var/run/docker.sock \\
      --restart unless-stopped \\
      --name dokemon-server -d javastraat/dokemon-server:latest`;

  const volumeCommand = `# Create Docker volume for Dokemon data
sudo docker volume create dokemondata

# Run Dokemon with volume
sudo docker run -p 9090:9090 \\
      -v dokemondata:/data \\
      -v /var/run/docker.sock:/var/run/docker.sock \\
      --restart unless-stopped \\
      --name dokemon-server -d javastraat/dokemon-server:latest`;

  const compose = `version: "3"
services:
    dokemon-server:
        ports:
            - 9090:9090
        volumes:
            - /dokemondata:/data
            - /var/run/docker.sock:/var/run/docker.sock
        restart: unless-stopped
        container_name: dokemon-server
        image: javastraat/dokemon-server:latest`;

  const composeVolume = `version: "3"
services:
    dokemon-server:
        ports:
            - 9090:9090
        volumes:
            - dokemondata:/data
            - /var/run/docker.sock:/var/run/docker.sock
        restart: unless-stopped
        container_name: dokemon-server
        image: javastraat/dokemon-server:latest

volumes:
    dokemondata:`;

  const traefikConfig = `version: "3.3"

services:
  traefik:
    image: "traefik:v2.10"
    container_name: "traefik"
    command:
      - "--log.level=DEBUG"
      - "--accesslog=true"
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.dokemon.acme.tlschallenge=true"
      - "--certificatesresolvers.dokemon.acme.email=your.email@example.com"
      - "--certificatesresolvers.dokemon.acme.storage=/letsencrypt/dokemon.json"
    ports:
      - "443:443"
      - "8080:8080"
    volumes:
      - "./letsencrypt:/letsencrypt"
      - "/var/run/docker.sock:/var/run/docker.sock:ro"

  dokemon:
    image: javastraat/dokemon-server:latest
    container_name: dokemon-server
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.dokemon.rule=Host(\`dokemon.example.com\`)"
      - "traefik.http.routers.dokemon.entrypoints=websecure"
      - "traefik.http.routers.dokemon.tls.certresolver=dokemon"
    ports:
      - 9090:9090
    volumes:
      - /dokemondata:/data
      - /var/run/docker.sock:/var/run/docker.sock`;

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'getting-started':
        return (
          <div className="flex flex-col items-center">
            {/* Main Getting Started Header */}
            <h2 className="text-2xl font-bold mb-8 text-center">Getting Started with Dokemon</h2>
            
            {/* Directory Version Section */}
            <div className="w-full mb-12">
              <h3 className="text-xl font-bold mb-4 text-center">Directory Version</h3>
              <div className="mb-4 w-full">
                <pre className="bg-slate-800 p-4 text-sm font-mono overflow-x-auto">
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

            {/* Volume Version Section */}
            <div className="w-full mb-12">
              <h3 className="text-xl font-bold mb-4 text-center">Volume Version</h3>
              <div className="mb-4 w-full">
                <pre className="bg-slate-800 p-4 text-sm font-mono overflow-x-auto">
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

            {/* Docker Compose Section */}
            <div className="w-full mb-12">
              <h3 className="text-xl font-bold mb-4 text-center">Docker Compose Version</h3>
              <div className="mb-4 w-full">
                <pre className="bg-slate-800 p-4 text-sm font-mono overflow-x-auto">
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

            {/* Docker Compose Volume Section */}
            <div className="w-full mb-12">
              <h3 className="text-xl font-bold mb-4 text-center">Docker Compose Volume Version</h3>
              <div className="mb-4 w-full">
                <pre className="bg-slate-800 p-4 text-sm font-mono overflow-x-auto">
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

    case 'extra':
      return (
        <div className="flex flex-col items-center">
          <div className="mb-16 w-full max-w-2xl mx-auto">
            {/* Production Usage Block */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">
                Production Usage
              </h3>
              <div className="bg-slate-800 p-6 rounded-lg">
                <p className="mb-4 text-base">
                  We recommend that you run Dokemon on a private network whenever
                  possible.
                </p>
                <p className="text-base">
                  If you are running on a VPS with only public access, we recommend
                  that you use an SSL enabled reverse proxy in front of Dokemon. Using Traefik with LetsEncrypt SSL certificate
                </p>
              </div>
            </div>

            {/* Traefik Configuration Block */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-2 text-center">Traefik Configuration Example:</h4>
              <div className="bg-slate-800 p-6 rounded-lg">
                <p className="mb-4 text-base">
                  This is an example configuration for running Dokémon behind Traefik with LetsEncrypt SSL certificate.
                </p>
                <p className="text-base">
                  Note: This is a sample configuration. Please modify it as per your requirements.
                </p>
              </div>
            </div>
            
            {/* Configuration Code Block */}
            <div className="mb-4 w-full">
              <pre className="bg-slate-800 p-4 text-sm font-mono overflow-x-auto rounded-lg">
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
            
            {/* Deployment Instructions Block */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-2 text-center">Deployment Instructions:</h4>
              <div className="bg-slate-800 p-6 rounded-lg">
                <ol className="list-decimal pl-5 space-y-2 text-base">
                  <li>In the DNS settings for your domain, add an A record for the Host which you have mentioned in the above config</li>
                  <li>The A record should point to the public IP address of your virtual machine</li>
                  <li>Create a file named compose.yaml on your server</li>
                  <li>Copy and paste the above YAML definition into the file</li>
                  <li>Modify the email and host. Make any other changes as per your requirements</li>
                  <li>Run <code className="bg-gray-700 px-1 py-0.5 rounded text-sm">mkdir ./letsencrypt && mkdir /dokemondata</code></li>
                  <li>Run <code className="bg-gray-700 px-1 py-0.5 rounded text-sm">docker compose up -d</code></li>
                  <li>Open <code className="bg-gray-700 px-1 py-0.5 rounded text-sm">https://dokemon.example.com</code> (substitute your URL here) in the browser</li>
                </ol>
              </div>
            </div>

            {/* SSL Note Block */}
            <div className="bg-slate-800 p-6 rounded-lg">
              <p className="text-base">
                It can take a few seconds for the SSL certificate to be provisioned. If you get an error related to SSL, please wait for a few moments and then refresh your browser.
              </p>
            </div>
          </div>
        </div>
      );


      case 'faq':
        return (
          <div className="flex flex-col items-center">
            <div className="w-full">
              <h3 className="text-xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
              <ul className="text-left space-y-6 max-w-2xl mx-auto">
                <li className="text-center">
                  <h4 className="text-lg font-semibold">Is this free for commercial use?</h4>
                  <p className="text-base">Yes.</p>
                </li>
                <li className="text-center">
                  <h4 className="text-lg font-semibold">Does this support Kubernetes and Docker Swarm?</h4>
                  <p className="text-base">No, currently we only support Standalone Docker on Linux.</p>
                </li>
                <li className="text-center">
                  <h4 className="text-lg font-semibold">Why is it named Dokémon?</h4>
                  <p className="text-base">Docker Manager &rarr; DockMan &rarr; DocMan &rarr; Dokémon<br />
                  That&apos;s how we arrived at the name! Doesn&apos;t really mean anything.</p>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'main':
      default:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-xl mb-2 text-center font-semibold">
              Docker Container Management GUI
            </h2>
            <h3 className="mb-4 text-center text-base">
              Deploy compose files, start/stop containers, delete unused images,
              view logs.
            </h3>
            <div className="mb-10">
              <iframe
                src="https://ghbtns.com/github-btn.html?user=dokemon-ng&repo=dokemon&type=star&count=true&size=large"
                width="128"
                height="30"
                title="GitHub"
              ></iframe>
            </div>

            <div className="mb-10 text-center w-full max-w-4xl">
              <h4 className="text-lg font-bold mb-2">Manage Multiple Servers</h4>
              <Image
                src="/screenshot-dokemon-nodes.jpg"
                alt="Dokemon nodes management interface"
                width={900}
                height={500}
                className="w-full"
              />
            </div>
            <div className="mb-10 text-center w-full max-w-4xl">
              <h4 className="text-lg font-bold mb-2">
                Manage Variables for Different Environments
              </h4>
              <Image
                src="/screenshot-dokemon-variables.jpg"
                alt="Dokemon variables management interface"
                width={900}
                height={500}
                className="w-full"
              />
            </div>
            <div className="mb-10 text-center w-full max-w-4xl">
              <h4 className="text-lg font-bold mb-2">Deploy Compose Projects</h4>
              <Image
                src="/screenshot-dokemon-compose-up.jpg"
                alt="Dokemon compose project deployment interface"
                width={900}
                height={500}
                className="w-full"
              />
            </div>
            <div className="mb-10 text-center w-full max-w-4xl">
              <h4 className="text-lg font-bold mb-2">
                Manage Containers, Images, Volumes, Networks
              </h4>
              <Image
                src="/screenshot-dokemon-containers.jpg"
                alt="Dokemon container management interface"
                width={900}
                height={500}
                className="w-full"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <main className="flex min-h-screen">
        {/* Sidebar Menu - Fixed height */}
        <div className="w-64 bg-gray-800 p-4 flex flex-col fixed h-screen">
          <h1 className="mb-6">
            <span className="sr-only">Dokemon</span>
            <Image
              src="/logo/dokemon-dark-medium.svg"
              alt="Dokemon"
              width={200}
              height={50}
            />
          </h1>
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-2 rounded-md text-base ${activeTab === item.id ? 'bg-amber-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pb-4">
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                  href="https://github.com/dokemon-ng/dokemon"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="inline-block w-5 h-5"
                    style={{ color: "#ddd" }}
                  />{" "}
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                  href="https://github.com/dokemon-ng/Software/issues"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="inline-block w-5 h-5"
                    style={{ color: "#ddd" }}
                  />{" "}
                  Report Issues
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                  href="https://discord.gg/Nfevu4gJVG"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faDiscord}
                    className="inline-block w-5 h-5"
                    style={{ color: "#5865f2" }}
                  />{" "}
                  Community Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 ml-64 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </>
  );
}
