'use client';

import { useState, useRef, useEffect } from 'react';
import { timelinePhases } from '@/data/wedding-data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';

function SubtaskNote({
  subtaskId,
  notes,
  setNotes,
}: {
  subtaskId: string;
  notes: Record<string, string>;
  setNotes: (updater: (prev: Record<string, string>) => Record<string, string>) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const note = notes[subtaskId] || '';

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const startEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraft(note);
    setEditing(true);
  };

  const save = () => {
    const trimmed = draft.trim();
    setNotes(prev => {
      const next = { ...prev };
      if (trimmed) {
        next[subtaskId] = trimmed;
      } else {
        delete next[subtaskId];
      }
      return next;
    });
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      save();
    } else if (e.key === 'Escape') {
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <div className="mt-0.5" onClick={e => { e.preventDefault(); e.stopPropagation(); }}>
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          placeholder="输入备注..."
          className="w-full text-xs px-2 py-1 rounded-md border border-pink-300 bg-white focus:outline-none focus:ring-1 focus:ring-pink-400 text-gray-600 placeholder-gray-300"
        />
      </div>
    );
  }

  if (note) {
    return (
      <div
        className="mt-0.5 flex items-center gap-1 group/note cursor-pointer"
        onClick={startEdit}
      >
        <div className="border-l-2 border-pink-300 pl-2">
          <span className="text-xs text-gray-400 leading-relaxed break-all">
            {note}
          </span>
        </div>
        <span className="text-xs opacity-0 group-hover/note:opacity-100 transition-opacity flex-shrink-0">
          ✏️
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={startEdit}
      className="mt-0.5 text-gray-300 hover:text-pink-400 transition-colors relative group/icon inline-flex items-center"
      title="点击添加备注"
    >
      <span className="text-xs">📝</span>
      <span className="ml-1 text-[10px] text-gray-400 opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">
        点击添加备注
      </span>
    </button>
  );
}

export default function TimelinePage() {
  const [completedTasks, setCompletedTasks] = useLocalStorage<Record<string, boolean>>('wedding-completed-subtasks', {});
  const [notes, setNotes] = useLocalStorage<Record<string, string>>('wedding-subtask-notes', {});
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
                          <div className="mt-3 pl-6 space-y-1.5 animate-slide-up">
                            {task.subTasks.map(st => {
                              const isCompleted = completedTasks[st.id] !== undefined
                                ? completedTasks[st.id]
                                : st.completed;

                              return (
                                <div key={st.id}>
                                  <div className="flex items-start gap-2">
                                    <label className="flex items-start gap-2 cursor-pointer group flex-1 min-w-0">
                                      <input
                                        type="checkbox"
                                        checked={isCompleted}
                                        onChange={() => toggleSubTask(st.id)}
                                        className="mt-0.5 w-4 h-4 rounded"
                                      />
                                      <div className="flex-1 min-w-0">
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
                                    <div className="shrink-0">
                                      <SubtaskNote
                                        subtaskId={st.id}
                                        notes={notes}
                                        setNotes={setNotes}
                                      />
                                    </div>
                                  </div>
                                </div>
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
