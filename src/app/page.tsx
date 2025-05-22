"use client";

import { useState, useEffect } from "react";
import { menuItems } from "./constants/menuItems";
import Sidebar from "./components/Sidebar";
import MobileMenuButton from "./components/MobileMenuButton";
import MainContent from "./components/ContentTabs/MainContent";
import GettingStarted from "./components/ContentTabs/GettingStarted";
import ComposeSamples from "./components/ContentTabs/ComposeSamples";
import ExtraContent from "./components/ContentTabs/ExtraContent";
import FAQ from "./components/ContentTabs/FAQ";

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

  const renderContent = () => {
    switch (activeTab) {
      case 'getting-started':
        return <GettingStarted />;
      case 'compose-samples':
        return <ComposeSamples />;
      case 'extra':
        return <ExtraContent />;
      case 'faq':
        return <FAQ />;
      case 'main':
      default:
        return <MainContent />;
    }
  };

  return (
    <>
      <main className="flex flex-col md:flex-row h-screen overflow-hidden">
        <MobileMenuButton 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />
  
        <div 
          className={`w-full md:w-64 bg-gray-800 p-4 flex flex-col fixed md:static z-10 h-full md:h-screen transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isMobile={isMobile}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
  
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
