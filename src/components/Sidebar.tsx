import React from 'react';
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Users,
  Building2,
  UserCircle,
  LogOut,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Role } from '../types';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: any) => void;
  role: Role;
  username: string;
  onLogout: () => void;
  onSwitchPortal?: () => void; // Allow demo quick toggling between portal states
}

export function Sidebar({ 
  currentView, 
  onViewChange, 
  role, 
  username, 
  onLogout,
  onSwitchPortal 
}: SidebarProps) {
  
  const pgItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'layanan-surat', icon: FileText, label: 'Layanan Surat' },
    { id: 'status-pengajuan', icon: ClipboardList, label: 'Daftar Terbit' },
    { id: 'data-warga', icon: Users, label: 'Data Warga' },
    { id: 'pengaturan-wilayah', icon: Building2, label: 'Pengaturan Wilayah' },
    { id: 'profil', icon: UserCircle, label: 'Profil Ketua RT' },
  ];

  const wgItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Beranda Warga' },
  ];

  const navItems = role === 'pengurus' ? pgItems : wgItems;

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 border-r border-slate-200 bg-white flex flex-col py-4 z-20">
      <div className="px-6 mb-6 mt-2">
        <h1 className="text-2xl font-black text-[#00288e] tracking-tight flex items-center gap-1.5">
          SILAS <span className="text-[9px] bg-blue-50 text-[#00288e] border border-blue-100 rounded px-1 py-0.5 uppercase tracking-wide font-bold">RT 60</span>
        </h1>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-1">
          Sistem Layanan Surat Resmi
        </p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                isActive
                  ? 'bg-blue-50 text-[#00288e] font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-[#00288e]' : 'text-slate-400'} />
              <span className="text-[13px]">{item.label}</span>
            </button>
          );
        })}

        {/* Quick Portal Switch for seamless evaluation testing! */}
        {onSwitchPortal && (
          <div className="pt-4 border-t border-slate-100 mt-4 px-2">
            <button
              type="button"
              onClick={onSwitchPortal}
              className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-[11px] font-bold text-slate-700 transition-colors shadow-sm cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <RefreshCw size={12} className="text-[#00288e] rotate-90" />
                <span>Beralih Portal Demo</span>
              </span>
              <span className="px-1.5 py-0.5 bg-indigo-100 text-[#00288e] rounded text-[8px] font-bold uppercase">
                {role === 'pengurus' ? 'Warga' : 'RT 60'}
              </span>
            </button>
          </div>
        )}
      </nav>

      {/* User profile capsule bottom */}
      <div className="px-4 mt-auto border-t border-slate-100 pt-4 pb-2 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-[#00288e] font-black text-xs flex items-center justify-center shrink-0">
            {username.slice(0, 2).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-900 truncate">{username}</p>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider truncate">
              {role === 'pengurus' ? 'Ketua RT 60' : 'Anggota Warga'}
            </p>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-slate-500 hover:bg-red-50 hover:text-red-700 rounded-lg text-xs font-bold transition-all cursor-pointer text-left"
        >
          <LogOut size={16} />
          <span>Keluar Sesi</span>
        </button>
      </div>
    </aside>
  );
}
