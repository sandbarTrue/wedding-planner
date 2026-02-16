'use client';

import { useState } from 'react';
import { timelinePhases } from '@/data/wedding-data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';

export default function TimelinePage() {
  const [completedTasks, setCompletedTasks] = useLocalStorage<Record<string, boolean>>('wedding-completed-subtasks', {});
  const [expandedPhase, setExpandedPhase] = useState<string | null>('phase-1');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const toggleSubTask = (subTaskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [subTaskId]: !(prev[subTaskId] !== undefined ? prev[subTaskId] : false),
    }));
  };

  const getTaskProgress = (taskId: string) => {
    let total = 0;
    let completed = 0;
    timelinePhases.forEach(phase => {
      const task = phase.tasks.find(t => t.id === taskId);
      if (task) {
        task.subTasks.forEach(st => {
          total++;
          if (completedTasks[st.id] !== undefined ? completedTasks[st.id] : st.completed) {
            completed++;
          }
        });
      }
    });
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const getPhaseProgress = (phaseId: string) => {
    const phase = timelinePhases.find(p => p.id === phaseId);
    if (!phase) return 0;
    let total = 0;
    let completed = 0;
    phase.tasks.forEach(task => {
      task.subTasks.forEach(st => {
        total++;
        if (completedTasks[st.id] !== undefined ? completedTasks[st.id] : st.completed) {
          completed++;
        }
      });
    });
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const gradients = [
    'from-pink-300 via-rose-400 to-pink-500',
    'from-pink-200 via-pink-400 to-rose-400',
    'from-rose-300 via-pink-400 to-pink-500',
    'from-pink-300 via-pink-500 to-rose-500',
    'from-rose-200 via-pink-400 to-pink-600',
    'from-pink-400 via-rose-400 to-pink-300',
    'from-rose-300 via-pink-500 to-rose-400',
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text">📅 备婚时间线</h1>
        <p className="text-sm text-gray-400 mt-1">7个阶段，从容准备每一刻</p>
      </div>

      <div className="space-y-4">
        {timelinePhases.map((phase, phaseIndex) => {
          const phaseProgress = getPhaseProgress(phase.id);
          const isExpanded = expandedPhase === phase.id;

          return (
            <Card key={phase.id} className="overflow-hidden">
              <button
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {phaseProgress >= 100 ? '✅' : '📋'}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {phase.name}：{phase.period}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {phase.tasks.length} 项任务
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-pink-500">
                      {Math.round(phaseProgress)}%
                    </span>
                    <span className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                </div>
                <ProgressBar
                  progress={phaseProgress}
                  showPercent={false}
                  size="sm"
                  gradient={gradients[phaseIndex % gradients.length]}
                />
              </button>

              {isExpanded && (
                <div className="mt-4 space-y-3 animate-slide-up">
                  {phase.tasks.map((task) => {
                    const taskProgress = getTaskProgress(task.id);
                    const isTaskExpanded = expandedTask === task.id;
                    const now = new Date();
                    const endDate = task.endDate ? new Date(task.endDate) : null;
                    const isOverdue = endDate && endDate < now && taskProgress < 100;

                    return (
                      <div
                        key={task.id}
                        className={`rounded-xl border p-3 ${
                          isOverdue
                            ? 'border-red-200 bg-red-50/50'
                            : taskProgress >= 100
                            ? 'border-green-200 bg-green-50/30'
                            : 'border-pink-100 bg-pink-50/30'
                        }`}
                      >
                        <button
                          onClick={() => setExpandedTask(isTaskExpanded ? null : task.id)}
                          className="w-full text-left"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                {taskProgress >= 100 ? '✅' : isOverdue ? '⚠️' : '📌'}
                              </span>
                              <span className={`text-sm font-medium ${
                                isOverdue ? 'text-red-600' : 'text-gray-700'
                              }`}>
                                {task.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              {task.startDate && (
                                <span>{task.startDate} ~ {task.endDate}</span>
                              )}
                              <span className={`font-semibold ${
                                taskProgress >= 100 ? 'text-green-500' : 'text-pink-500'
                              }`}>
                                {Math.round(taskProgress)}%
                              </span>
                            </div>
                          </div>
                        </button>

                        {isTaskExpanded && (
                          <div className="mt-3 pl-6 space-y-2 animate-slide-up">
                            {task.subTasks.map(st => {
                              const isCompleted = completedTasks[st.id] !== undefined
                                ? completedTasks[st.id]
                                : st.completed;

                              return (
                                <label
                                  key={st.id}
                                  className="flex items-start gap-2 cursor-pointer group"
                                >
                                  <input
                                    type="checkbox"
                                    checked={isCompleted}
                                    onChange={() => toggleSubTask(st.id)}
                                    className="mt-0.5 w-4 h-4 rounded"
                                  />
                                  <div>
                                    <span className={`text-sm ${
                                      isCompleted ? 'line-through text-gray-400' : 'text-gray-600'
                                    }`}>
                                      {st.name}
                                    </span>
                                    {st.details && (
                                      <p className="text-xs text-gray-400 mt-0.5">{st.details}</p>
                                    )}
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
