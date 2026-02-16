'use client';

import Card from '@/components/Card';
import Countdown from '@/components/Countdown';
import TotalProgress from '@/components/TotalProgress';
import Calendar from '@/components/Calendar';
import MonthlyTasks from '@/components/MonthlyTasks';
import KeyProgress from '@/components/KeyProgress';
import Link from 'next/link';

const quickLinks = [
  { href: '/timeline', label: '备婚时间线', icon: '📅', desc: '7个阶段完整规划' },
  { href: '/gantt', label: '甘特图', icon: '📊', desc: '任务时间跨度一览' },
  { href: '/process-overview', label: '总体流程表', icon: '🗂️', desc: '备婚全流程概览' },
  { href: '/budget', label: '预算控制表', icon: '💰', desc: '费用预算与追踪' },
  { href: '/day-schedule', label: '婚礼当天流程', icon: '⏰', desc: '当天时间安排' },
  { href: '/team', label: '帮帮团分工', icon: '👥', desc: '人员职责分配' },
  { href: '/checklist', label: '物料清点表', icon: '✅', desc: '物品清单核对' },
  { href: '/countdown-tasks', label: '倒计时事务', icon: '🔔', desc: '最后1个月事务' },
];

export default function Home() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-1">
          💕 我们的备婚管理看板 💕
        </h1>
        <p className="text-sm text-gray-400">记录每一个幸福的准备</p>
      </div>

      {/* Top row: Countdown + Progress + Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Countdown />
        </div>
        <Card title="备婚总进度" icon="🎯" className="md:col-span-1">
          <TotalProgress />
        </Card>
        <Card title="本月日历" icon="📆" className="md:col-span-1">
          <Calendar />
        </Card>
      </div>

      {/* Middle row: Monthly tasks + Key Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="本月待办任务" icon="📝">
          <MonthlyTasks />
        </Card>
        <Card title="关键任务进度" icon="🏆">
          <KeyProgress />
        </Card>
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>🔗</span> 管理模板
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all group"
            >
              <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">{link.icon}</span>
              <h3 className="text-sm font-semibold text-gray-700 group-hover:text-pink-500 transition-colors">{link.label}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
