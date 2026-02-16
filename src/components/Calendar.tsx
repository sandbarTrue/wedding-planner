'use client';

import { useState, useMemo } from 'react';
import { timelinePhases } from '@/data/wedding-data';

export default function Calendar() {
  const [currentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const taskDates = useMemo(() => {
    const dates = new Set<string>();
    timelinePhases.forEach(phase => {
      phase.tasks.forEach(task => {
        if (task.startDate) {
          const start = new Date(task.startDate);
          const end = task.endDate ? new Date(task.endDate) : start;
          if (
            (start.getFullYear() === year && start.getMonth() === month) ||
            (end.getFullYear() === year && end.getMonth() === month)
          ) {
            // Add days in this month that fall within the task range
            const monthStart = new Date(year, month, 1);
            const monthEnd = new Date(year, month + 1, 0);
            const rangeStart = start > monthStart ? start : monthStart;
            const rangeEnd = end < monthEnd ? end : monthEnd;
            for (let d = new Date(rangeStart); d <= rangeEnd; d.setDate(d.getDate() + 1)) {
              dates.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
            }
          }
        }
      });
    });
    return dates;
  }, [year, month]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = currentDate.getDate();

  const weeks = [];
  let week: (number | null)[] = [];
  
  // Fill leading empty cells
  for (let i = 0; i < firstDay; i++) {
    week.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  
  // Fill trailing empty cells
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div>
      <div className="text-center mb-3">
        <span className="text-sm font-semibold text-gray-700">
          {year}年 {monthNames[month]}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(d => (
          <div key={d} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
        ))}
        
        {weeks.map((w, wi) =>
          w.map((day, di) => {
            if (day === null) return <div key={`${wi}-${di}`} />;
            
            const isToday = day === today;
            const hasTask = taskDates.has(`${year}-${month}-${day}`);

            return (
              <div
                key={`${wi}-${di}`}
                className={`text-center py-1.5 text-xs rounded-lg relative transition-all ${
                  isToday
                    ? 'bg-pink-500 text-white font-bold shadow-md'
                    : hasTask
                    ? 'bg-pink-100 text-pink-600 font-medium'
                    : 'text-gray-600 hover:bg-pink-50'
                }`}
              >
                {day}
                {hasTask && !isToday && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
