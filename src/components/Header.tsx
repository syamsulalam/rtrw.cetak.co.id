import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { Role } from '../types';

interface HeaderProps {
  role: Role;
  searchPlaceholder?: string;
  onSearchChange?: (val: string) => void;
}

export function Header({ role, searchPlaceholder, onSearchChange }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-white border-b border-slate-200 z-10 flex justify-between items-center px-8 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-sm">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            disabled={!onSearchChange}
            placeholder={searchPlaceholder || (role === 'pengurus' ? "Cari data pengurus..." : "Cari info pelayanan...")}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:outline-none text-xs text-slate-909 placeholder:text-slate-400 transition-all font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <span className="text-xs text-[#00288e] bg-blue-50 border border-blue-100/60 px-3 py-1.5 rounded-full font-bold lg:block hidden">
          {role === 'pengurus' ? 'RT 60 / RW 14 - Kebonagung' : 'Kawasan Terintegrasi Warga'}
        </span>
        <div className="h-6 w-px bg-slate-200 hidden lg:block mx-1"></div>
        <button className="p-2 text-slate-400 hover:text-[#00288e] transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
        <button className="p-2 text-slate-400 hover:text-[#00288e] transition-colors">
          <HelpCircle size={18} />
        </button>
      </div>
    </header>
  );
}
