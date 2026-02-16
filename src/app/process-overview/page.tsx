'use client';

import { timelinePhases } from '@/data/wedding-data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';

export default function ProcessOverviewPage() {
  const [completedTasks] = useLocalStorage<Record<string, boolean>>('wedding-completed-subtasks', {});

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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text">🗂️ 总体流程表</h1>
        <p className="text-sm text-gray-400 mt-1">备婚全流程概览</p>
      </div>

      {/* Task Detail Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-pink-200">
                <th className="text-left py-3 px-2 text-gray-500 font-medium">序号</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">关键事项</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">分项任务</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">开始日期</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">结束日期</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium min-w-[120px]">完成进度</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">状态</th>
                <th className="text-center py-3 px-2 text-gray-500 font-medium">完成</th>
                <th className="text-center py-3 px-2 text-gray-500 font-medium">超期</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                let index = 0;
                return timelinePhases.map(phase =>
                  phase.tasks.map(task => {
                    index++;
                    const progress = getTaskProgress(task.id);
                    const now = new Date();
                    const endDate = task.endDate ? new Date(task.endDate) : null;
                    const isOverdue = endDate && endDate < now && progress < 100;
                    const isComplete = progress >= 100;
                    
                    let status = '未开始';
                    let statusColor = 'text-gray-400';
                    if (isComplete) {
                      status = '已完成';
                      statusColor = 'text-green-500';
                    } else if (isOverdue) {
                      status = '已超期';
                      statusColor = 'text-red-500';
                    } else if (progress > 0) {
                      status = '进行中';
                      statusColor = 'text-pink-500';
                    }

                    const subTaskNames = task.subTasks.map(st => st.name).join('、');

                    return (
                      <tr
                        key={task.id}
                        className={`border-b border-pink-50 hover:bg-pink-50/50 transition-colors ${
                          isOverdue ? 'bg-red-50/30' : ''
                        }`}
                      >
                        <td className="py-2.5 px-2 text-gray-400">{index}</td>
                        <td className="py-2.5 px-2 font-medium text-gray-700">{task.name}</td>
                        <td className="py-2.5 px-2 text-gray-500 text-xs max-w-[200px]">
                          <span className="line-clamp-2">{subTaskNames}</span>
                        </td>
                        <td className="py-2.5 px-2 text-gray-500 text-xs whitespace-nowrap">
                          {task.startDate || '-'}
                        </td>
                        <td className="py-2.5 px-2 text-gray-500 text-xs whitespace-nowrap">
                          {task.endDate || '-'}
                        </td>
                        <td className="py-2.5 px-2">
                          <ProgressBar progress={progress} size="sm" showPercent={true} />
                        </td>
                        <td className={`py-2.5 px-2 text-xs font-medium ${statusColor}`}>
                          {status}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          {isComplete ? '✅' : '⬜'}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          {isOverdue ? '⚠️' : '-'}
                        </td>
                      </tr>
                    );
                  })
                );
              })()}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
