'use client';

import { useMemo } from 'react';
import { timelinePhases } from '@/data/wedding-data';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function MonthlyTasks() {
  const [completedTasks, setCompletedTasks] = useLocalStorage<Record<string, boolean>>('wedding-completed-subtasks', {});
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const monthlyTasks = useMemo(() => {
    const tasks: { taskName: string; subTask: { id: string; name: string; completed: boolean }; isOverdue: boolean }[] = [];
    
    timelinePhases.forEach(phase => {
      phase.tasks.forEach(task => {
        if (task.startDate && task.endDate) {
          const start = new Date(task.startDate);
          const end = new Date(task.endDate);
          
          // Check if this task spans the current month
          const monthStart = new Date(currentYear, currentMonth, 1);
          const monthEnd = new Date(currentYear, currentMonth + 1, 0);
          
          if (start <= monthEnd && end >= monthStart) {
            task.subTasks.forEach(st => {
              const isCompleted = completedTasks[st.id] !== undefined ? completedTasks[st.id] : st.completed;
              const isOverdue = !isCompleted && end < now;
              tasks.push({
                taskName: task.name,
                subTask: { ...st, completed: isCompleted },
                isOverdue,
              });
            });
          }
        }
      });
    });
    
    return tasks;
  }, [completedTasks, currentYear, currentMonth, now]);

  const toggleSubTask = (subTaskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [subTaskId]: !prev[subTaskId],
    }));
  };

  if (monthlyTasks.length === 0) {
    return (
      <div className="text-center text-gray-400 py-4">
        <p className="text-2xl mb-2">🎉</p>
        <p className="text-sm">本月没有待办任务</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
      {monthlyTasks.map((item, index) => (
        <div
          key={item.subTask.id}
          className={`flex items-start gap-3 p-2 rounded-lg transition-all ${
            item.isOverdue
              ? 'bg-red-50 border border-red-200'
              : item.subTask.completed
              ? 'bg-green-50/50'
              : 'hover:bg-pink-50'
          }`}
        >
          <span className="text-xs text-gray-400 mt-0.5 w-5 text-right shrink-0">
            {index + 1}.
          </span>
          <label className="flex items-start gap-2 cursor-pointer flex-1 min-w-0">
            <input
              type="checkbox"
              checked={item.subTask.completed}
              onChange={() => toggleSubTask(item.subTask.id)}
              className="mt-0.5 w-4 h-4 rounded shrink-0"
            />
            <div className="min-w-0">
              <span className={`text-sm ${
                item.subTask.completed
                  ? 'line-through text-gray-400'
                  : item.isOverdue
                  ? 'text-red-600 font-medium'
                  : 'text-gray-700'
              }`}>
                {item.subTask.name}
              </span>
              <span className="text-xs text-gray-400 ml-1">({item.taskName})</span>
              {item.isOverdue && (
                <span className="ml-1 text-xs text-red-500">⚠️ 超期</span>
              )}
            </div>
          </label>
        </div>
      ))}
    </div>
  );
}
