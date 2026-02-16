'use client';

import { useState } from 'react';
import { defaultBudgetItems, BudgetItem } from '@/data/wedding-data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Card from '@/components/Card';

export default function BudgetPage() {
  const [budgetItems, setBudgetItems] = useLocalStorage<BudgetItem[]>('wedding-budget', defaultBudgetItems);
  const [editingId, setEditingId] = useState<string | null>(null);

  const categories = Array.from(new Set(budgetItems.map(b => b.category)));

  const totalBudget = budgetItems.reduce((sum, b) => sum + b.budget, 0);
  const totalActual = budgetItems.reduce((sum, b) => sum + b.actual, 0);
  const remaining = totalBudget - totalActual;

  const updateItem = (id: string, field: keyof BudgetItem, value: string | number) => {
    setBudgetItems(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text">💰 预算控制表</h1>
        <p className="text-sm text-gray-400 mt-1">合理规划每一笔花费</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <p className="text-sm text-gray-500">总预算</p>
          <p className="text-2xl font-bold text-pink-500">¥{totalBudget.toLocaleString()}</p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-gray-500">已花费</p>
          <p className="text-2xl font-bold text-rose-500">¥{totalActual.toLocaleString()}</p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-gray-500">剩余</p>
          <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ¥{remaining.toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Budget table by category */}
      {categories.map(category => {
        const items = budgetItems.filter(b => b.category === category);
        const catBudget = items.reduce((s, i) => s + i.budget, 0);
        const catActual = items.reduce((s, i) => s + i.actual, 0);

        return (
          <Card key={category}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700">{category}</h3>
              <div className="text-xs text-gray-400">
                预算 ¥{catBudget.toLocaleString()} | 实际 ¥{catActual.toLocaleString()}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-pink-100">
                    <th className="text-left py-2 px-2 text-gray-500 font-medium">项目</th>
                    <th className="text-right py-2 px-2 text-gray-500 font-medium">预算</th>
                    <th className="text-right py-2 px-2 text-gray-500 font-medium">实际</th>
                    <th className="text-right py-2 px-2 text-gray-500 font-medium">差额</th>
                    <th className="text-left py-2 px-2 text-gray-500 font-medium">备注</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => {
                    const diff = item.budget - item.actual;
                    const isEditing = editingId === item.id;

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-pink-50 hover:bg-pink-50/50 cursor-pointer"
                        onClick={() => setEditingId(isEditing ? null : item.id)}
                      >
                        <td className="py-2 px-2 text-gray-700">{item.item}</td>
                        <td className="py-2 px-2 text-right">
                          {isEditing ? (
                            <input
                              type="number"
                              value={item.budget}
                              onChange={e => updateItem(item.id, 'budget', Number(e.target.value))}
                              onClick={e => e.stopPropagation()}
                              className="w-24 text-right px-2 py-1 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                            />
                          ) : (
                            <span className="text-gray-600">¥{item.budget.toLocaleString()}</span>
                          )}
                        </td>
                        <td className="py-2 px-2 text-right">
                          {isEditing ? (
                            <input
                              type="number"
                              value={item.actual}
                              onChange={e => updateItem(item.id, 'actual', Number(e.target.value))}
                              onClick={e => e.stopPropagation()}
                              className="w-24 text-right px-2 py-1 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                            />
                          ) : (
                            <span className="text-gray-600">¥{item.actual.toLocaleString()}</span>
                          )}
                        </td>
                        <td className={`py-2 px-2 text-right font-medium ${
                          diff >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {diff >= 0 ? '+' : ''}{diff.toLocaleString()}
                        </td>
                        <td className="py-2 px-2">
                          {isEditing ? (
                            <input
                              type="text"
                              value={item.note}
                              onChange={e => updateItem(item.id, 'note', e.target.value)}
                              onClick={e => e.stopPropagation()}
                              placeholder="添加备注..."
                              className="w-full px-2 py-1 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">{item.note || '-'}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
