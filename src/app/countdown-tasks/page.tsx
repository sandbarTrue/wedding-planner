'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';

interface CountdownTask {
  id: string;
  item: string;
  note: string;
  responsible: string;
  deadline: string;
  completed: boolean;
}

const defaultTasks: CountdownTask[] = [
  { id: 'ct1', item: '确定最终婚礼流程', note: '与策划师最后确认', responsible: '新娘', deadline: '2025-09-10', completed: false },
  { id: 'ct2', item: '试妆并确定最终造型', note: '提前试妆2-3个造型', responsible: '新娘', deadline: '2025-09-10', completed: false },
  { id: 'ct3', item: '准备红包袋', note: '大小红包各准备50个', responsible: '新郎', deadline: '2025-09-15', completed: false },
  { id: 'ct4', item: '发送请柬', note: '电子+纸质请柬', responsible: '双方', deadline: '2025-09-15', completed: false },
  { id: 'ct5', item: '确定最终宾客名单', note: '统计出席人数', responsible: '双方', deadline: '2025-09-20', completed: false },
  { id: 'ct6', item: '安排外地宾客住宿交通', note: '预订酒店房间', responsible: '新郎', deadline: '2025-09-25', completed: false },
  { id: 'ct7', item: '准备婚礼歌单', note: '入场、敬酒、仪式用歌曲', responsible: '新娘', deadline: '2025-09-20', completed: false },
  { id: 'ct8', item: '制作婚礼视频', note: '成长视频/恋爱回忆视频', responsible: '双方', deadline: '2025-09-25', completed: false },
  { id: 'ct9', item: '确定接亲流程', note: '堵门游戏、路线规划', responsible: '伴娘团', deadline: '2025-09-25', completed: false },
  { id: 'ct10', item: '购买酒水饮料零食', note: '婚宴用酒、饮料、喜糖', responsible: '新郎', deadline: '2025-09-28', completed: false },
  { id: 'ct11', item: '确定最后婚宴桌数', note: '向酒店确认', responsible: '双方', deadline: '2025-09-30', completed: false },
  { id: 'ct12', item: '准备新娘急救包', note: '创可贴/针线/面纸/补妆品', responsible: '伴娘', deadline: '2025-09-28', completed: false },
];

export default function CountdownTasksPage() {
  const [tasks, setTasks] = useLocalStorage<CountdownTask[]>('wedding-countdown-tasks', defaultTasks);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const updateTask = (id: string, field: keyof CountdownTask, value: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text">🔔 倒计时1个月事务表</h1>
        <p className="text-sm text-gray-400 mt-1">最后冲刺，确保完美</p>
      </div>

      <Card className="text-center">
        <p className="text-sm text-gray-500 mb-2">完成进度：{completed}/{total}</p>
        <ProgressBar
          progress={(completed / total) * 100}
          size="lg"
          gradient="from-pink-300 via-rose-400 to-pink-600"
        />
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-pink-200">
                <th className="text-center py-3 px-2 text-gray-500 font-medium w-10">✓</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">分项</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">说明备注</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">责任人</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">完成时间</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => {
                const isOverdue = !task.completed && new Date(task.deadline) < new Date();
                
                return (
                  <tr
                    key={task.id}
                    className={`border-b border-pink-50 hover:bg-pink-50/50 transition-colors ${
                      isOverdue ? 'bg-red-50/30' : task.completed ? 'bg-green-50/30' : ''
                    }`}
                  >
                    <td className="py-2.5 px-2 text-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-4 h-4 rounded"
                      />
                    </td>
                    <td className={`py-2.5 px-2 font-medium ${
                      task.completed ? 'line-through text-gray-400' :
                      isOverdue ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      {task.item}
                      {isOverdue && <span className="ml-1 text-xs">⚠️</span>}
                    </td>
                    <td className="py-2.5 px-2">
                      <input
                        type="text"
                        value={task.note}
                        onChange={e => updateTask(task.id, 'note', e.target.value)}
                        className="w-full bg-transparent text-gray-500 text-xs border-b border-transparent hover:border-pink-200 focus:border-pink-400 focus:outline-none px-1"
                      />
                    </td>
                    <td className="py-2.5 px-2">
                      <input
                        type="text"
                        value={task.responsible}
                        onChange={e => updateTask(task.id, 'responsible', e.target.value)}
                        className="w-full bg-transparent text-gray-600 text-sm border-b border-transparent hover:border-pink-200 focus:border-pink-400 focus:outline-none px-1"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-xs text-gray-500 whitespace-nowrap">
                      {task.deadline}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
