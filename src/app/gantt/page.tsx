'use client';

import { useState, useMemo } from 'react';
import { timelinePhases } from '@/data/wedding-data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Card from '@/components/Card';

const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

export default function GanttPage() {
  const [completedTasks] = useLocalStorage<Record<string, boolean>>('wedding-completed-subtasks', {});
  const [selectedYear, setSelectedYear] = useState(2025);
  const [viewRange, setViewRange] = useState<[number, number]>([0, 11]); // month range

  const allTasks = useMemo(() => {
    const tasks: {
      id: string;
      phase: string;
      name: string;
      startDate: Date;
      endDate: Date;
      progress: number;
      isOverdue: boolean;
    }[] = [];

    timelinePhases.forEach(phase => {
      phase.tasks.forEach(task => {
        if (task.startDate && task.endDate) {
          let total = 0;
          let completed = 0;
          task.subTasks.forEach(st => {
            total++;
            if (completedTasks[st.id] !== undefined ? completedTasks[st.id] : st.completed) {
              completed++;
            }
          });
          const progress = total > 0 ? (completed / total) * 100 : 0;
          const endDate = new Date(task.endDate);
          const isOverdue = endDate < new Date() && progress < 100;

          tasks.push({
            id: task.id,
            phase: phase.name,
            name: task.name,
            startDate: new Date(task.startDate),
            endDate,
            progress,
            isOverdue,
          });
        }
      });
    });

    return tasks;
  }, [completedTasks]);

  const filteredTasks = useMemo(() => {
    return allTasks.filter(task => {
      const taskStartMonth = task.startDate.getFullYear() === selectedYear ? task.startDate.getMonth() : 0;
      const taskEndMonth = task.endDate.getFullYear() === selectedYear ? task.endDate.getMonth() : 11;
      return (
        (task.startDate.getFullYear() <= selectedYear && task.endDate.getFullYear() >= selectedYear) &&
        (taskStartMonth <= viewRange[1] && taskEndMonth >= viewRange[0])
      );
    });
  }, [allTasks, selectedYear, viewRange]);

  const monthsInView = useMemo(() => {
    const months = [];
    for (let i = viewRange[0]; i <= viewRange[1]; i++) {
      months.push(i);
    }
    return months;
  }, [viewRange]);

  const getBarStyle = (task: typeof allTasks[0]) => {
    const rangeStartDate = new Date(selectedYear, viewRange[0], 1);
    const rangeEndDate = new Date(selectedYear, viewRange[1] + 1, 0);
    const totalDays = (rangeEndDate.getTime() - rangeStartDate.getTime()) / (1000 * 60 * 60 * 24);

    const taskStart = task.startDate < rangeStartDate ? rangeStartDate : task.startDate;
    const taskEnd = task.endDate > rangeEndDate ? rangeEndDate : task.endDate;

    const startOffset = (taskStart.getTime() - rangeStartDate.getTime()) / (1000 * 60 * 60 * 24);
    const duration = (taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24);

    const left = (startOffset / totalDays) * 100;
    const width = Math.max((duration / totalDays) * 100, 2);

    return { left: `${left}%`, width: `${width}%` };
  };

  const presets = [
    { label: '上半年', range: [0, 5] as [number, number] },
    { label: '下半年', range: [6, 11] as [number, number] },
    { label: '全年', range: [0, 11] as [number, number] },
    { label: 'Q1', range: [0, 2] as [number, number] },
    { label: 'Q2', range: [3, 5] as [number, number] },
    { label: 'Q3', range: [6, 8] as [number, number] },
    { label: 'Q4', range: [9, 11] as [number, number] },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text">📊 甘特图</h1>
        <p className="text-sm text-gray-400 mt-1">所有任务的时间跨度一览</p>
      </div>

      {/* Controls */}
      <Card>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">年份：</span>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              className="px-3 py-1.5 rounded-lg border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {presets.map(p => (
              <button
                key={p.label}
                onClick={() => setViewRange(p.range)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  viewRange[0] === p.range[0] && viewRange[1] === p.range[1]
                    ? 'bg-pink-500 text-white'
                    : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Gantt Chart */}
      <Card>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Month headers */}
            <div className="flex border-b border-pink-100 pb-2 mb-3">
              <div className="w-48 shrink-0 text-xs font-medium text-gray-500 pr-2">任务</div>
              <div className="flex-1 flex">
                {monthsInView.map(m => (
                  <div
                    key={m}
                    className="flex-1 text-center text-xs font-medium text-gray-400"
                  >
                    {MONTH_NAMES[m]}
                  </div>
                ))}
              </div>
            </div>

            {/* Task rows */}
            <div className="space-y-1.5">
              {filteredTasks.map(task => (
                <div key={task.id} className="flex items-center group">
                  <div className="w-48 shrink-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">
                        {task.progress >= 100 ? '✅' : task.isOverdue ? '⚠️' : '📌'}
                      </span>
                      <span className={`text-xs truncate ${
                        task.isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'
                      }`}>
                        {task.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 relative h-7">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex">
                      {monthsInView.map(m => (
                        <div key={m} className="flex-1 border-l border-pink-50" />
                      ))}
                    </div>
                    {/* Task bar */}
                    <div
                      className="absolute top-1 h-5 rounded-full overflow-hidden group-hover:h-6 group-hover:top-0.5 transition-all"
                      style={getBarStyle(task)}
                    >
                      <div className={`h-full rounded-full ${
                        task.progress >= 100
                          ? 'bg-gradient-to-r from-green-300 to-green-400'
                          : task.isOverdue
                          ? 'bg-gradient-to-r from-red-300 to-red-400'
                          : 'bg-gradient-to-r from-pink-300 to-pink-400'
                      }`}>
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all"
                          style={{ width: `${task.progress}%`, opacity: task.progress >= 100 ? 0 : 1 }}
                        />
                      </div>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white drop-shadow">
                        {Math.round(task.progress)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Today marker */}
            {(() => {
              const now = new Date();
              if (now.getFullYear() !== selectedYear) return null;
              const currentMonth = now.getMonth();
              if (currentMonth < viewRange[0] || currentMonth > viewRange[1]) return null;
              
              const rangeStartDate = new Date(selectedYear, viewRange[0], 1);
              const rangeEndDate = new Date(selectedYear, viewRange[1] + 1, 0);
              const totalDays = (rangeEndDate.getTime() - rangeStartDate.getTime()) / (1000 * 60 * 60 * 24);
              const dayOffset = (now.getTime() - rangeStartDate.getTime()) / (1000 * 60 * 60 * 24);
              const left = (dayOffset / totalDays) * 100;

              return (
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-pink-500 opacity-60 z-10"
                  style={{ left: `calc(192px + ${left}% * (100% - 192px) / 100%)` }}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-pink-500 font-medium whitespace-nowrap">
                    今天
                  </span>
                </div>
              );
            })()}
          </div>
        </div>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 justify-center text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-2 rounded-full bg-gradient-to-r from-pink-300 to-pink-400 inline-block" />
          进行中
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-2 rounded-full bg-gradient-to-r from-green-300 to-green-400 inline-block" />
          已完成
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-2 rounded-full bg-gradient-to-r from-red-300 to-red-400 inline-block" />
          已超期
        </div>
      </div>
    </div>
  );
}
