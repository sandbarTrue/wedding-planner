'use client';

import { defaultChecklist, ChecklistCategory } from '@/data/wedding-data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';

export default function ChecklistPage() {
  const [checklist, setChecklist] = useLocalStorage<ChecklistCategory[]>('wedding-checklist', defaultChecklist);

  const toggleItem = (categoryId: string, itemId: string) => {
    setChecklist(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map(item =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : cat
      )
    );
  };

  const totalItems = checklist.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedItems = checklist.reduce(
    (sum, cat) => sum + cat.items.filter(i => i.checked).length,
    0
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text">✅ 物料清点表</h1>
        <p className="text-sm text-gray-400 mt-1">确保万事俱备</p>
      </div>

      {/* Overall progress */}
      <Card className="text-center">
        <p className="text-sm text-gray-500 mb-2">
          清点进度：{checkedItems}/{totalItems}
        </p>
        <ProgressBar
          progress={(checkedItems / totalItems) * 100}
          size="lg"
          gradient="from-pink-300 via-rose-400 to-pink-600"
        />
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checklist.map(category => {
          const catChecked = category.items.filter(i => i.checked).length;
          const catTotal = category.items.length;

          return (
            <Card key={category.id}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-700">{category.name}</h3>
                <span className="text-xs text-pink-500 font-medium">
                  {catChecked}/{catTotal}
                </span>
              </div>
              <ProgressBar
                progress={(catChecked / catTotal) * 100}
                showPercent={false}
                size="sm"
              />
              <div className="mt-3 space-y-2">
                {category.items.map(item => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItem(category.id, item.id)}
                      className="w-4 h-4 rounded"
                    />
                    <span className={`text-sm transition-all ${
                      item.checked
                        ? 'line-through text-gray-400'
                        : 'text-gray-600 group-hover:text-pink-500'
                    }`}>
                      {item.name}
                    </span>
                  </label>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
