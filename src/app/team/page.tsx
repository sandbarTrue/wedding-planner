'use client';

import { defaultTeamMembers, TeamMember } from '@/data/wedding-data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Card from '@/components/Card';

export default function TeamPage() {
  const [members, setMembers] = useLocalStorage<TeamMember[]>('wedding-team', defaultTeamMembers);

  const updateMember = (id: string, field: keyof TeamMember, value: string | number) => {
    setMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const addMember = () => {
    const newId = `tm-${Date.now()}`;
    setMembers(prev => [...prev, { id: newId, name: '', count: 1, role: '', contact: '' }]);
  };

  const removeMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text">👥 帮帮团分工明细</h1>
        <p className="text-sm text-gray-400 mt-1">感谢每一位帮忙的朋友</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-pink-200">
                <th className="text-left py-3 px-2 text-gray-500 font-medium">姓名</th>
                <th className="text-center py-3 px-2 text-gray-500 font-medium">人数</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">职责</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">联系方式</th>
                <th className="text-center py-3 px-2 text-gray-500 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id} className="border-b border-pink-50 hover:bg-pink-50/50">
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={member.name}
                      onChange={e => updateMember(member.id, 'name', e.target.value)}
                      placeholder="姓名"
                      className="w-full px-2 py-1 border border-pink-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/50"
                    />
                  </td>
                  <td className="py-2 px-2 text-center">
                    <input
                      type="number"
                      value={member.count}
                      onChange={e => updateMember(member.id, 'count', Number(e.target.value))}
                      className="w-16 text-center px-2 py-1 border border-pink-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/50"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={member.role}
                      onChange={e => updateMember(member.id, 'role', e.target.value)}
                      placeholder="职责"
                      className="w-full px-2 py-1 border border-pink-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/50"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={member.contact}
                      onChange={e => updateMember(member.id, 'contact', e.target.value)}
                      placeholder="手机号/微信"
                      className="w-full px-2 py-1 border border-pink-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/50"
                    />
                  </td>
                  <td className="py-2 px-2 text-center">
                    <button
                      onClick={() => removeMember(member.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                      title="删除"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={addMember}
          className="mt-4 w-full py-2 border-2 border-dashed border-pink-200 rounded-xl text-pink-400 hover:border-pink-400 hover:text-pink-500 transition-colors text-sm"
        >
          + 添加成员
        </button>
      </Card>
    </div>
  );
}
