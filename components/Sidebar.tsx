'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/playground', label: 'Home', icon: Home },
    { href: '/playground/settings', label: 'Settings', icon: Settings },
    { href: '/playground/help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col w-64 bg-white border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-2xl font-semibold">Playground</span>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 py-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={`flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 ${
                  pathname === item.href ? 'bg-gray-200' : ''
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
