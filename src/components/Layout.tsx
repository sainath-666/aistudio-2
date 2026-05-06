import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  LayoutDashboard, 
  ClipboardCheck, 
  MapPin, 
  Menu, 
  X,
  Info,
  Users,
  ChevronRight,
  Stethoscope
} from 'lucide-react';

interface SidebarItemProps {
  key?: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const SidebarItem = ({ icon, label, active, onClick, collapsed }: SidebarItemProps) => (

  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20' 
        : 'text-gray-500 hover:bg-gray-100'
    }`}
  >
    <span className="flex-shrink-0">{icon}</span>
    {!collapsed && <span className="font-medium text-sm">{label}</span>}
  </button>
);

export default function Layout({ children, currentView, setView }: { 
  children: React.ReactNode; 
  currentView: string;
  setView: (view: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'landing', label: 'Program Overview', icon: <Info size={20} /> },
    { id: 'dashboard', label: 'Oversight Portal', icon: <LayoutDashboard size={20} /> },
    { id: 'form', label: 'Examination Form', icon: <Stethoscope size={20} /> },
    { id: 'districts', label: 'District Status', icon: <MapPin size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="bg-teal-600 p-2 rounded-lg text-white">
            <Eye size={24} />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-tight">AP Vision</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Outreach Program</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={currentView === item.id}
              onClick={() => setView(item.id)}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className={`transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} size={20} />
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-bottom border-gray-200 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-teal-600 p-1.5 rounded-lg text-white">
            <Eye size={20} />
          </div>
          <span className="font-bold text-gray-900">AP Vision</span>
        </div>
        <button onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-4/5 max-w-sm h-full bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="bg-teal-600 p-1.5 rounded-lg text-white">
                    <Eye size={20} />
                  </div>
                  <span className="font-bold text-gray-900">AP Vision</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setView(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                      currentView === item.id 
                        ? 'bg-teal-600 text-white' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden pt-16 md:pt-0">
        <header className="hidden md:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-gray-800">
            {menuItems.find(i => i.id === currentView)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Government Oversight Portal</span>
            <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs">
              AD
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
