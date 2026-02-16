'use client';

import { useEffect, useState } from 'react';
import { WEDDING_DATE } from '@/data/wedding-data';

export default function Countdown() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculate = () => {
      const wedding = new Date(WEDDING_DATE + 'T00:00:00');
      const now = new Date();
      const diff = wedding.getTime() - now.getTime();

      if (diff > 0) {
        setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      } else {
        setDays(0);
        setHours(0);
        setMinutes(0);
      }
    };

    calculate();
    const timer = setInterval(calculate, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-gradient-to-br from-pink-400 via-pink-500 to-rose-400 rounded-2xl p-6 text-white shadow-lg">
        <div className="text-center">
          <p className="text-pink-100 text-sm mb-1">距离婚礼还有</p>
          <div className="flex items-center justify-center gap-3">
            <div className="text-center">
              <span className="text-5xl font-bold">--</span>
              <p className="text-xs text-pink-100 mt-1">天</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const weddingDate = new Date(WEDDING_DATE);
  const isPast = new Date() > weddingDate;

  return (
    <div className="bg-gradient-to-br from-pink-400 via-pink-500 to-rose-400 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-2 right-4 text-3xl opacity-30">💍</div>
      <div className="absolute bottom-2 left-4 text-2xl opacity-20">💕</div>

      <div className="text-center relative z-10">
        <p className="text-pink-100 text-sm mb-1">
          {isPast ? '🎉 我们已经结婚啦！' : '距离婚礼还有'}
        </p>

        {!isPast && (
          <div className="flex items-center justify-center gap-4 my-3">
            <div className="text-center">
              <span className="text-5xl font-bold">{days}</span>
              <p className="text-xs text-pink-100 mt-1">天</p>
            </div>
            <span className="text-2xl opacity-60">:</span>
            <div className="text-center">
              <span className="text-3xl font-bold">{hours}</span>
              <p className="text-xs text-pink-100 mt-1">时</p>
            </div>
            <span className="text-2xl opacity-60">:</span>
            <div className="text-center">
              <span className="text-3xl font-bold">{minutes}</span>
              <p className="text-xs text-pink-100 mt-1">分</p>
            </div>
          </div>
        )}

        <p className="text-pink-100 text-xs mt-2">
          📅 {weddingDate.getFullYear()}年{weddingDate.getMonth() + 1}月{weddingDate.getDate()}日
        </p>
      </div>
    </div>
  );
}
