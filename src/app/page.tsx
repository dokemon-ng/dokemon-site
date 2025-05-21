"use client";

import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState, useEffect } from "react";

const menuItems = [
  { id: 'main', title: 'Main' },
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'compose-samples', title: 'Compose Samples' },
  { id: 'extra', title: 'Extra' },
  { id: 'faq', title: 'FAQ' }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('main');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const command = `# Create directory to store Dokémon data
sudo mkdir /dokemondata

# Run Dokémon
sudo docker run -p 9090:9090 \\
      -v /dokemondata:/data \\
      -v /var/run/docker.sock:/var/run/docker.sock \\
      --restart unless-stopped \\
      --name dokemon-server -d javastraat/dokemon-server:latest`;

  const volumeCommand = `# Create Docker volume for Dokémon data
sudo docker volume create dokemondata

# Run Dokémon with volume
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

  const piholeCompose = `version: "3"

# More info at https://github.com/pi-hole/docker-pi-hole/ and https://docs.pi-hole.net/
services:
  pihole:
    container_name: pihole
    image: pihole/pihole:latest
    # For DHCP it is recommended to remove these ports and instead add: network_mode: "host"
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "8008:80/tcp"
    environment:
      TZ: 'Europe/Amsterdam'
      WEBPASSWORD: 'YOURPASSWORD'
    # Volumes store your data between container upgrades
    volumes:
      - '/pihole/etc-pihole:/etc/pihole'
      - '/pihole/etc-dnsmasq.d:/etc/dnsmasq.d'    
    #   https://github.com/pi-hole/docker-pi-hole#note-on-capabilities
    cap_add:
      - NET_ADMIN # Recommended but not required (DHCP needs NET_ADMIN)      
    restart: unless-stopped`;

  const renderContent = () => {
    switch (activeTab) {
      case 'getting-started':
        return (
          <div className="flex flex-col items-center">
            {/* Main Getting Started Header */}
            <h2 className="text-2xl font-bold mb-8 text-center">Getting Started with Dokémon</h2>

            {/* Directory Version Section */}
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

            {/* Volume Version Section */}
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

            {/* Docker Compose Directory Section */}
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

            {/* Docker Compose Volume Section */}
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
      case 'compose-samples':
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-8 text-center">Compose Samples</h2>

            {/* PiHole Sample Section */}
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
      case 'extra':
        return (
          <div className="flex flex-col items-center">
            <div className="mb-16 w-full text-center px-4 md:px-0">
              <h3 className="text-xl font-bold mb-4">
                Production Usage
              </h3>
              <p className="mb-4 text-base">
                We recommend that you run Dokémon on a private network whenever
                possible.
              </p>
              <p className="mb-6 text-base">
                If you are running on a VPS with only public access, we recommend
                that you use an SSL enabled reverse proxy in front of Dokémon. Using Traefik with LetsEncrypt SSL certificate
              </p>

              <h4 className="text-lg font-semibold mb-2">Traefik Configuration Example:</h4>
              <p className="mb-4 text-base">
                This is an example configuration for running Dokémon behind Traefik with LetsEncrypt SSL certificate.
                <br /><br />
                Note: This is a sample configuration. Please modify it as per your requirements.
              </p>

              <div className="mb-4 w-full text-left">
                <pre className="bg-slate-800 p-4 text-sm font-mono overflow-x-auto rounded">
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
                <ol className="list-decimal pl-5 space-y-2 max-w-xl mx-auto text-base text-left">
                  <li>In the DNS settings for your domain, add an A record for the Host which you have mentioned in the above config</li>
                  <li>The A record should point to the public IP address of your virtual machine</li>
                  <li>Create a file named compose.yaml on your server</li>
                  <li>Copy and paste the above YAML definition into the file</li>
                  <li>Modify the email and host. Make any other changes as per your requirements</li>
                  <li>Run <code className="bg-gray-700 px-1 py-0.5 rounded text-sm">mkdir ./letsencrypt && mkdir /dokemondata</code></li>
                  <li>Run <code className="bg-gray-700 px-1 py-0.5 rounded text-sm">docker compose up -d</code></li>
                  <li>Open <code className="bg-gray-700 px-1 py-0.5 rounded text-sm">https://dokemon.example.com</code> (substitute your URL here) in the browser</li>
                </ol>
                <p className="mt-4 text-base">
                  It can take a few seconds for the SSL certificate to be provisioned. If you get an error related to SSL, please wait for a few moments and then refresh your browser.
                </p>
              </div>
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="flex flex-col items-center px-4 md:px-0">
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
                  <p className="text-base">Docker Manager → DockMan → DocMan → Dokémon<br />
                    That&apos;s how we arrived at the name! Doesn&apos;t really mean anything.</p>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'main':
      default:
        return (
          <div className="flex flex-col items-center px-4 md:px-0">
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
                alt="Dokémon nodes management interface"
                width={900}
                height={500}
                className="w-full rounded-lg"
              />
            </div>
            <div className="mb-10 text-center w-full max-w-4xl">
              <h4 className="text-lg font-bold mb-2">
                Manage Variables for Different Environments
              </h4>
              <Image
                src="/screenshot-dokemon-variables.jpg"
                alt="Dokémon variables management interface"
                width={900}
                height={500}
                className="w-full rounded-lg"
              />
            </div>
            <div className="mb-10 text-center w-full max-w-4xl">
              <h4 className="text-lg font-bold mb-2">Deploy Compose Projects</h4>
              <Image
                src="/screenshot-dokemon-compose-up.jpg"
                alt="Dokémon compose project deployment interface"
                width={900}
                height={500}
                className="w-full rounded-lg"
              />
            </div>
            <div className="mb-10 text-center w-full max-w-4xl">
              <h4 className="text-lg font-bold mb-2">
                Manage Containers, Images, Volumes, Networks
              </h4>
              <Image
                src="/screenshot-dokemon-containers.jpg"
                alt="Dokémon container management interface"
                width={900}
                height={500}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <main className="flex flex-col md:flex-row h-screen overflow-hidden">
        {/* Mobile menu button */}
        <div className="md:hidden bg-gray-800 p-4 flex justify-between items-center">
          <h1>
            <span className="sr-only">Dokémon</span>
            <Image
              src="/logo/dokemon-dark-medium.svg"
              alt="Dokémon"
              width={150}
              height={40}
            />
          </h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
            )}
          </button>
        </div>
  
        {/* Single Sidebar Menu - Fixed */}
        <div 
          className={`w-full md:w-64 bg-gray-800 p-4 flex flex-col fixed md:static z-10 h-full md:h-screen transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <h1 className="mb-6 hidden md:block">
            <span className="sr-only">Dokémon</span>
            <Image
              src="/logo/dokemon-dark-medium.svg"
              alt="Dokémon"
              width={200}
              height={50}
            />
          </h1>
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      if (isMobile) setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-md text-base ${
                      activeTab === item.id 
                        ? 'bg-amber-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
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
                  rel="noopener noreferrer"
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
                  rel="noopener noreferrer"
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
                  rel="noopener noreferrer"
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
  
        {/* Main Content - Scrollable and Centered */}
        <div className="flex-1 overflow-y-auto h-full">
          <div className="flex justify-center w-full">
            <div className="w-full max-w-6xl px-4 md:px-8 py-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
