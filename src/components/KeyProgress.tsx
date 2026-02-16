'use client';

import { keyCategories, timelinePhases } from '@/data/wedding-data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import ProgressBar from './ProgressBar';

export default function KeyProgress() {
  const [completedTasks] = useLocalStorage<Record<string, boolean>>('wedding-completed-subtasks', {});

  const gradients = [
    'from-pink-300 via-rose-400 to-pink-500',
    'from-pink-200 via-pink-400 to-rose-400',
    'from-rose-300 via-pink-400 to-pink-500',
    'from-pink-300 via-pink-500 to-rose-500',
    'from-rose-200 via-pink-400 to-pink-600',
  ];

  return (
    <div className="space-y-4">
      {keyCategories.map((cat, index) => {
        // Calculate progress from actual subtask completion
        let totalSubTasks = 0;
        let completedCount = 0;
        
        cat.taskIds.forEach(taskId => {
          timelinePhases.forEach(phase => {
            const task = phase.tasks.find(t => t.id === taskId);
            if (task) {
              task.subTasks.forEach(st => {
                totalSubTasks++;
                if (completedTasks[st.id] !== undefined ? completedTasks[st.id] : st.completed) {
                  completedCount++;
                }
              });
            }
          });
        });

        const progress = totalSubTasks > 0 ? (completedCount / totalSubTasks) * 100 : cat.defaultProgress;

        return (
          <div key={cat.id} className="flex items-center gap-3">
            <span className="text-xl w-8 text-center">{cat.icon}</span>
            <div className="flex-1">
              <ProgressBar
                progress={progress}
                label={cat.name}
                gradient={gradients[index % gradients.length]}
                size="sm"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
