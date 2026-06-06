import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Role } from '../types';

interface AppLayoutProps {
  children: React.ReactNode;
  role: Role;
  username: string;
  currentView: string;
  onViewChange: (view: any) => void;
  onLogout: () => void;
  onSwitchPortal?: () => void;
}

export function AppLayout({ 
  children, 
  role, 
  username, 
  currentView, 
  onViewChange, 
  onLogout,
  onSwitchPortal
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Sidebar 
        currentView={currentView}
        onViewChange={onViewChange}
        role={role}
        username={username}
        onLogout={onLogout}
        onSwitchPortal={onSwitchPortal}
      />
      
      <Header role={role} />
      
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-8 max-w-6xl mx-auto block">
          {children}
        </div>
      </main>
    </div>
  );
}
