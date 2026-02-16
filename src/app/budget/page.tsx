'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Card from '@/components/Card';

interface BudgetItem {
  id: string;
  category: string;
  item: string;
  budget: number;
  actual: number;
  note: string;
}

const defaultBudgetData: BudgetItem[] = [
  // 婚庆仪式
  { id: 'hq-1', category: '婚庆仪式', item: '策划', budget: 0, actual: 0, note: '' },
  { id: 'hq-2', category: '婚庆仪式', item: '司仪', budget: 0, actual: 0, note: '' },
  { id: 'hq-3', category: '婚庆仪式', item: '摄影', budget: 0, actual: 0, note: '' },
  { id: 'hq-4', category: '婚庆仪式', item: '摄像', budget: 0, actual: 0, note: '' },
  { id: 'hq-5', category: '婚庆仪式', item: '跟妆', budget: 0, actual: 0, note: '' },
  // 场地餐饮
  { id: 'cd-1', category: '场地餐饮', item: '奉节酒店', budget: 0, actual: 0, note: '' },
  { id: 'cd-2', category: '场地餐饮', item: '彭州酒店', budget: 0, actual: 0, note: '' },
  { id: 'cd-3', category: '场地餐饮', item: '酒水', budget: 0, actual: 0, note: '' },
  { id: 'cd-4', category: '场地餐饮', item: '喜糖喜烟', budget: 0, actual: 0, note: '' },
  // 服饰美容
  { id: 'fs-1', category: '服饰美容', item: '婚纱', budget: 0, actual: 0, note: '' },
  { id: 'fs-2', category: '服饰美容', item: '西服', budget: 0, actual: 0, note: '' },
  { id: 'fs-3', category: '服饰美容', item: '伴郎伴娘服', budget: 0, actual: 0, note: '' },
  { id: 'fs-4', category: '服饰美容', item: '三金', budget: 0, actual: 0, note: '' },
  { id: 'fs-5', category: '服饰美容', item: '钻戒', budget: 0, actual: 0, note: '' },
  // 婚照婚品
  { id: 'hz-1', category: '婚照婚品', item: '婚纱照', budget: 0, actual: 0, note: '' },
  { id: 'hz-2', category: '婚照婚品', item: '请帖', budget: 0, actual: 0, note: '' },
  { id: 'hz-3', category: '婚照婚品', item: '喜字', budget: 0, actual: 0, note: '' },
  { id: 'hz-4', category: '婚照婚品', item: '婚房装饰', budget: 0, actual: 0, note: '' },
  // 交通住宿
  { id: 'jt-1', category: '交通住宿', item: '婚车', budget: 0, actual: 0, note: '' },
  { id: 'jt-2', category: '交通住宿', item: '外地宾客住宿', budget: 0, actual: 0, note: '' },
  // 其他
  { id: 'qt-1', category: '其他', item: '红包', budget: 0, actual: 0, note: '' },
  { id: 'qt-2', category: '其他', item: '伴手礼', budget: 0, actual: 0, note: '' },
  { id: 'qt-3', category: '其他', item: '甜品台', budget: 0, actual: 0, note: '' },
];

const categoryIcons: Record<string, string> = {
  '婚庆仪式': '🎊',
  '场地餐饮': '🏨',
  '服饰美容': '👗',
  '婚照婚品': '📸',
  '交通住宿': '🚗',
  '其他': '📦',
};

const categoryOrder = ['婚庆仪式', '场地餐饮', '服饰美容', '婚照婚品', '交通住宿', '其他'];

export default function BudgetPage() {
  const [budgetItems, setBudgetItems] = useLocalStorage<BudgetItem[]>('wedding-budget-v2', defaultBudgetData);
  const [editingId, setEditingId] = useState<string | null>(null);

  const totalBudget = budgetItems.reduce((sum, b) => sum + b.budget, 0);
  const totalActual = budgetItems.reduce((sum, b) => sum + b.actual, 0);
  const totalDiff = totalBudget - totalActual;

  const updateItem = (id: string, field: keyof BudgetItem, value: string | number) => {
    setBudgetItems(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const formatMoney = (v: number) => {
    if (v === 0) return '-';
    return `¥${v.toLocaleString()}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text">💰 预算控制表</h1>
        <p className="text-sm text-gray-400 mt-1">合理规划每一笔花费</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center !p-4">
          <p className="text-xs text-gray-500 mb-1">总预算</p>
          <p className="text-xl font-bold text-pink-500">{formatMoney(totalBudget)}</p>
        </Card>
        <Card className="text-center !p-4">
          <p className="text-xs text-gray-500 mb-1">已花费</p>
          <p className="text-xl font-bold text-rose-500">{formatMoney(totalActual)}</p>
        </Card>
        <Card className="text-center !p-4">
          <p className="text-xs text-gray-500 mb-1">剩余</p>
          <p className={`text-xl font-bold ${totalDiff >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalBudget === 0 && totalActual === 0 ? '-' : `¥${totalDiff.toLocaleString()}`}
          </p>
        </Card>
      </div>

      {/* Budget table by category */}
      {categoryOrder.map(category => {
        const items = budgetItems.filter(b => b.category === category);
        if (items.length === 0) return null;
        const catBudget = items.reduce((s, i) => s + i.budget, 0);
        const catActual = items.reduce((s, i) => s + i.actual, 0);
        const catDiff = catBudget - catActual;

        return (
          <Card key={category}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <span>{categoryIcons[category] || '📋'}</span>
                {category}
              </h3>
              <div className="text-xs text-gray-400">
                预算 <span className="text-pink-500 font-medium">{formatMoney(catBudget)}</span>
                {' | '}
                实际 <span className="text-rose-500 font-medium">{formatMoney(catActual)}</span>
              </div>
            </div>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-pink-100">
                    <th className="text-left py-2 px-2 text-gray-500 font-medium text-xs">项目</th>
                    <th className="text-right py-2 px-2 text-gray-500 font-medium text-xs w-28">预算(¥)</th>
                    <th className="text-right py-2 px-2 text-gray-500 font-medium text-xs w-28">实际(¥)</th>
                    <th className="text-right py-2 px-2 text-gray-500 font-medium text-xs w-24">差额</th>
                    <th className="text-left py-2 px-2 text-gray-500 font-medium text-xs">备注</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => {
                    const diff = item.budget - item.actual;
                    const isEditing = editingId === item.id;

                    return (
                      <tr
                        key={item.id}
                        className={`border-b border-pink-50 transition-colors ${
                          isEditing ? 'bg-pink-50/80' : 'hover:bg-pink-50/50'
                        } cursor-pointer`}
                        onClick={() => setEditingId(isEditing ? null : item.id)}
                      >
                        <td className="py-2.5 px-2 text-gray-700 text-sm">{item.item}</td>
                        <td className="py-2.5 px-2 text-right">
                          {isEditing ? (
                            <input
                              type="number"
                              value={item.budget || ''}
                              onChange={e => updateItem(item.id, 'budget', Number(e.target.value) || 0)}
                              onClick={e => e.stopPropagation()}
                              placeholder="0"
                              className="w-full text-right px-2 py-1 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                            />
                          ) : (
                            <span className="text-gray-600">{formatMoney(item.budget)}</span>
                          )}
                        </td>
                        <td className="py-2.5 px-2 text-right">
                          {isEditing ? (
                            <input
                              type="number"
                              value={item.actual || ''}
                              onChange={e => updateItem(item.id, 'actual', Number(e.target.value) || 0)}
                              onClick={e => e.stopPropagation()}
                              placeholder="0"
                              className="w-full text-right px-2 py-1 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                            />
                          ) : (
                            <span className="text-gray-600">{formatMoney(item.actual)}</span>
                          )}
                        </td>
                        <td className={`py-2.5 px-2 text-right text-sm font-medium ${
                          item.budget === 0 && item.actual === 0
                            ? 'text-gray-300'
                            : diff >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {item.budget === 0 && item.actual === 0 ? '-' : `${diff >= 0 ? '+' : ''}${diff.toLocaleString()}`}
                        </td>
                        <td className="py-2.5 px-2">
                          {isEditing ? (
                            <input
                              type="text"
                              value={item.note}
                              onChange={e => updateItem(item.id, 'note', e.target.value)}
                              onClick={e => e.stopPropagation()}
                              placeholder="添加备注..."
                              className="w-full px-2 py-1 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">{item.note || '-'}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Category subtotal */}
                  <tr className="bg-pink-50/30">
                    <td className="py-2 px-2 text-xs font-semibold text-pink-500">小计</td>
                    <td className="py-2 px-2 text-right text-xs font-semibold text-pink-500">{formatMoney(catBudget)}</td>
                    <td className="py-2 px-2 text-right text-xs font-semibold text-rose-500">{formatMoney(catActual)}</td>
                    <td className={`py-2 px-2 text-right text-xs font-semibold ${
                      catBudget === 0 && catActual === 0
                        ? 'text-gray-300'
                        : catDiff >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {catBudget === 0 && catActual === 0 ? '-' : `${catDiff >= 0 ? '+' : ''}${catDiff.toLocaleString()}`}
                    </td>
                    <td className="py-2 px-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        );
      })}

      {/* Grand total */}
      <Card className="!bg-gradient-to-r !from-pink-50 !to-rose-50 !border-pink-200">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-3 px-2 font-bold text-pink-600 text-base">💰 总计</td>
                <td className="py-3 px-2 text-right font-bold text-pink-600 w-28">
                  {formatMoney(totalBudget)}
                </td>
                <td className="py-3 px-2 text-right font-bold text-rose-600 w-28">
                  {formatMoney(totalActual)}
                </td>
                <td className={`py-3 px-2 text-right font-bold w-24 ${
                  totalDiff >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {totalBudget === 0 && totalActual === 0 ? '-' : `${totalDiff >= 0 ? '+' : ''}${totalDiff.toLocaleString()}`}
                </td>
                <td className="py-3 px-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Tip */}
      <p className="text-center text-xs text-gray-400">
        💡 点击任意行可编辑预算、实际花费和备注
      </p>
    </div>
  );
}
