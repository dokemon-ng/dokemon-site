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
  { id: 'extra', title: 'Extra' }
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

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'getting-started':
        return (
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Get Started Now</h3>
            <div className="mb-4 text-xs sm:text-base w-full max-w-2xl">
              <pre className="bg-slate-800 p-4 sm:p-8 md:px-12 focus:outline-none font-mono">
                {command}
              </pre>
            </div>
            <div className="mb-8">
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

            <h3 className="text-lg font-bold mb-4">Docker Compose Version</h3>
            <div className="mb-4 text-xs sm:text-base w-full max-w-2xl">
              <pre className="bg-slate-800 p-4 sm:p-8 md:px-12 focus:outline-none font-mono">
                {compose}
              </pre>
            </div>
            <div className="mb-8">
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
        );
      case 'extra':
        return (
          <div className="flex flex-col items-center">
            <div className="mb-16 max-w-2xl">
              <h3 className="text-lg font-bold mb-4 text-center">
                Production Usage
              </h3>
              <p className="mb-2">
                We recommend that you run Dokemon on a private network whenever
                possible.
              </p>
              <p>
                If you are running on a VPS with only public access, we recommend
                that you use an SSL enabled reverse proxy in front of Dokemon. See{" "}
                <a
                  className="underline underline-offset-4"
                  href="https://github.com/dokemon-ng/dokemon"
                  target="_blank"
                >
                  example configuration with Traefik.
                </a>
              </p>
            </div>
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold mb-4 text-center">FAQ</h3>
              <ul className="text-left flex flex-col gap-6">
                <li>
                  <h4 className="font-semibold">
                    Is this free for commercial use?
                  </h4>
                  <p>Yes.</p>
                </li>
                <li>
                  <h4 className="font-semibold">
                    Does this support Kubernetes and Docker Swarm?
                  </h4>
                  <p>No, currently we only support Standalone Docker on Linux.</p>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'main':
      default:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-lg mb-2 text-center font-semibold">
              Docker Container Management GUI
            </h2>
            <h3 className="mb-4 text-center">
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
              <h4 className="font-bold mb-2">Manage Multiple Servers</h4>
              <Image
                src="/screenshot-dokemon-nodes.jpg"
                alt="Dokemon nodes management interface"
                width={900}
                height={500}
                className="w-full"
              />
            </div>
            <div className="mb-10 text-center w-full max-w-4xl">
              <h4 className="font-bold mb-2">
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
              <h4 className="font-bold mb-2">Deploy Compose Projects</h4>
              <Image
                src="/screenshot-dokemon-compose-up.jpg"
                alt="Dokemon compose project deployment interface"
                width={900}
                height={500}
                className="w-full"
              />
            </div>
            <div className="mb-10 text-center w-full max-w-4xl">
              <h4 className="font-bold mb-2">
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
                    className={`w-full text-left px-4 py-2 rounded-md ${activeTab === item.id ? 'bg-amber-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
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
