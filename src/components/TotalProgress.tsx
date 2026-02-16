'use client';

import { timelinePhases } from '@/data/wedding-data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import ProgressBar from './ProgressBar';

export default function TotalProgress() {
  const [completedTasks] = useLocalStorage<Record<string, boolean>>('wedding-completed-subtasks', {});

  let totalSubTasks = 0;
  let completedCount = 0;

  timelinePhases.forEach(phase => {
    phase.tasks.forEach(task => {
      task.subTasks.forEach(st => {
        totalSubTasks++;
        if (completedTasks[st.id] !== undefined ? completedTasks[st.id] : st.completed) {
          completedCount++;
        }
      });
    });
  });

  const progress = totalSubTasks > 0 ? (completedCount / totalSubTasks) * 100 : 0;

  return (
    <div>
      <div className="text-center mb-3">
        <span className="text-3xl font-bold gradient-text">{Math.round(progress)}%</span>
        <p className="text-sm text-gray-500 mt-1">
          已完成 {completedCount}/{totalSubTasks} 项
        </p>
      </div>
      <ProgressBar
        progress={progress}
        showPercent={false}
        size="lg"
        gradient="from-pink-300 via-rose-400 to-pink-600"
      />
    </div>
  );
}
