import { menuItems } from "../constants/menuItems";
import { ThemeToggle } from '../components/ThemeToggle'
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { VERSION } from "../version";

export default function Sidebar({
  activeTab,
  setActiveTab,
  isMobile,
  setIsMobileMenuOpen
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) {
  return (
    <>
      <h1 className="mb-6 hidden md:block">
        <span className="sr-only">Dokémon</span>
        <Image
          src="/logo/dokemon-dark-small.png"
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
              href="https://github.com/dokemon-ng/dokemon/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="inline-block w-5 h-5"
                style={{ color: "#ddd" }}
              />{" "}
              Open Issues
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
<div className="mt-4 pt-4 border-t border-gray-700 dark:border-gray-600">
  <div className="text-xs text-gray-500 text-center mb-2">
    Dokémon v{VERSION}
  </div>
  <div className="flex justify-center">
    <ThemeToggle />
  </div>
</div>
    </>
  );
}
