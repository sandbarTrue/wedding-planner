'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { timelinePhases } from '@/data/wedding-data';
import { useLocalStorage } from '@/hooks/useLocalStorage';

function TaskNote({
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
      <div className="mt-1" onClick={e => { e.preventDefault(); e.stopPropagation(); }}>
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
        className="mt-1 flex items-center gap-1 cursor-pointer group/note"
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
      className="mt-0.5 text-gray-300 hover:text-pink-400 transition-colors relative group/icon"
      title="点击添加备注"
    >
      <span className="text-xs">📝</span>
      <span className="absolute left-5 top-0 text-[10px] text-gray-400 opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        点击添加备注
      </span>
    </button>
  );
}

export default function MonthlyTasks() {
  const [completedTasks, setCompletedTasks] = useLocalStorage<Record<string, boolean>>('wedding-completed-subtasks', {});
  const [notes, setNotes] = useLocalStorage<Record<string, string>>('wedding-subtask-notes', {});
  
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
          <div className="flex-1 min-w-0">
            <label className="flex items-start gap-2 cursor-pointer">
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
            <div className="pl-6">
              <TaskNote subtaskId={item.subTask.id} notes={notes} setNotes={setNotes} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
