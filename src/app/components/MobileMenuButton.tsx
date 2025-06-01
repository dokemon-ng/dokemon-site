import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function MobileMenuButton({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) {
  return (
    <div className="md:hidden bg-gray-800 p-4 flex justify-between items-center">
      <h1>
        <span className="sr-only">Dokémon</span>
        <Image
          src="/logo/dokemon-dark-small.png"
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
  );
}
