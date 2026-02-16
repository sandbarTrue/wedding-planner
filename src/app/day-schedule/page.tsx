'use client';

import { defaultDaySchedule, DayScheduleItem } from '@/data/wedding-data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Card from '@/components/Card';

export default function DaySchedulePage() {
  const [schedule, setSchedule] = useLocalStorage<DayScheduleItem[]>('wedding-day-schedule', defaultDaySchedule);

  const updateItem = (id: string, field: keyof DayScheduleItem, value: string) => {
    setSchedule(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text">⏰ 婚礼当天流程表</h1>
        <p className="text-sm text-gray-400 mt-1">精确到分钟的幸福安排</p>
      </div>

      {/* Visual timeline */}
      <div className="space-y-4">
        {schedule.map((item, index) => (
          <Card key={item.id} className="relative">
            {/* Timeline connector */}
            {index < schedule.length - 1 && (
              <div className="absolute left-8 top-full w-0.5 h-4 bg-pink-200 z-10" />
            )}
            
            <div className="flex items-start gap-4">
              {/* Time badge */}
              <div className="shrink-0 w-20 text-center">
                <div className="bg-gradient-to-br from-pink-400 to-rose-400 text-white rounded-xl py-2 px-3 shadow-sm">
                  <span className="text-sm font-bold">{item.startTime}</span>
                </div>
                <span className="text-xs text-gray-400 mt-1 block">~{item.endTime}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">
                    {index === 0 ? '💄' : index === 3 ? '🎮' : index === 4 ? '🍵' :
                     index === 8 ? '💒' : index === 9 ? '🥂' : '💕'}
                  </span>
                  <input
                    type="text"
                    value={item.stage}
                    onChange={e => updateItem(item.id, 'stage', e.target.value)}
                    className="font-semibold text-gray-800 bg-transparent border-b border-transparent hover:border-pink-200 focus:border-pink-400 focus:outline-none transition-colors px-1"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <span>📍</span>
                  <input
                    type="text"
                    value={item.location}
                    onChange={e => updateItem(item.id, 'location', e.target.value)}
                    className="bg-transparent border-b border-transparent hover:border-pink-200 focus:border-pink-400 focus:outline-none transition-colors px-1 flex-1"
                  />
                </div>
                <input
                  type="text"
                  value={item.details}
                  onChange={e => updateItem(item.id, 'details', e.target.value)}
                  className="text-sm text-gray-500 bg-transparent border-b border-transparent hover:border-pink-200 focus:border-pink-400 focus:outline-none transition-colors px-1 w-full"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
