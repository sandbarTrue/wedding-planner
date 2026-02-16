'use client';

import { weddingItinerary } from '@/data/wedding-data';
import Card from '@/components/Card';

export default function ItineraryPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold gradient-text">🗓️ 婚礼行程安排</h1>
        <p className="text-sm text-gray-400 mt-1">9月27日 — 10月3日 · 两场婚礼行程</p>
      </div>

      {/* Route overview */}
      <Card>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 flex-wrap">
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">成都</span>
          <span>🚗→</span>
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">重庆奉节</span>
          <span>💒→</span>
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-medium">成都彭州</span>
          <span>💒</span>
        </div>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 via-pink-300 to-rose-300" />

        <div className="space-y-4">
          {weddingItinerary.map((item) => {
            const date = new Date(item.date);
            const dayOfWeek = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
            const isToday = new Date().toDateString() === date.toDateString();
            const isPast = new Date() > new Date(item.date + 'T23:59:59');

            return (
              <div key={item.id} className="relative flex gap-4 ml-0">
                {/* Node */}
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 shadow-md ${
                  item.isWedding
                    ? 'bg-gradient-to-br from-pink-500 to-rose-500 ring-4 ring-pink-200'
                    : isToday
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-400 ring-4 ring-yellow-200'
                    : isPast
                    ? 'bg-gray-200'
                    : 'bg-white border-2 border-pink-200'
                }`}>
                  {item.icon}
                </div>

                {/* Content */}
                <div className={`flex-1 rounded-xl p-4 ${
                  item.isWedding
                    ? 'bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 shadow-md'
                    : isToday
                    ? 'bg-yellow-50 border border-yellow-200 shadow-md'
                    : isPast
                    ? 'bg-gray-50 border border-gray-200 opacity-70'
                    : 'bg-white border border-pink-100 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.isWedding ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'
                      }`}>
                        {date.getMonth() + 1}月{date.getDate()}日 周{dayOfWeek}
                      </span>
                      {isToday && (
                        <span className="text-xs bg-yellow-400 text-white px-2 py-0.5 rounded-full animate-pulse">
                          今天
                        </span>
                      )}
                      {item.isWedding && (
                        <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full">
                          💒 婚礼日
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className={`font-bold text-lg ${item.isWedding ? 'text-pink-600' : 'text-gray-800'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">📍 {item.location}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <Card>
        <div className="text-center text-sm text-gray-500 space-y-1">
          <p>🚗 行程总计 <strong>7天</strong></p>
          <p>💒 两场婚礼：<span className="text-red-500 font-medium">9/29 重庆奉节</span> · <span className="text-pink-500 font-medium">10/3 成都彭州</span></p>
        </div>
      </Card>
    </div>
  );
}
