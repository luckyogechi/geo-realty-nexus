import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LiveChatWidget from './LiveChatWidget';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <LiveChatWidget />
    </div>
  );
};

export default Layout;