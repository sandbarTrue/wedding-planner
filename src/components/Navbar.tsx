'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: '看板', icon: '📋' },
  { href: '/itinerary', label: '婚礼行程', icon: '🗓️' },
  { href: '/timeline', label: '时间线', icon: '📅' },
  { href: '/gantt', label: '甘特图', icon: '📊' },
  { href: '/process-overview', label: '总体流程', icon: '🗂️' },
  { href: '/budget', label: '预算', icon: '💰' },
  { href: '/day-schedule', label: '当天流程', icon: '⏰' },
  { href: '/team', label: '帮帮团', icon: '👥' },
  { href: '/checklist', label: '物料清点', icon: '✅' },
  { href: '/countdown-tasks', label: '倒计时事务', icon: '🔔' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">💒</span>
            <span className="text-lg font-semibold gradient-text">备婚管理看板</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === item.href
                    ? 'bg-pink-100 text-pink-600'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-500'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-pink-50 transition-colors"
          >
            <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-pink-100">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === item.href
                    ? 'bg-pink-100 text-pink-600'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-500'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
