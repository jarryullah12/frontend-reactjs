import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-bgLight dark:bg-dark-bg transition-colors overflow-x-hidden">
      <Navbar />
      <div className="container-custom py-4 max-w-full">
        <div className="flex flex-col lg:flex-row">
          <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <Sidebar />
          </div>
          <main className="flex-1 px-2 lg:px-4 w-full max-w-full overflow-hidden">
            {children}
          </main>
          <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout; 