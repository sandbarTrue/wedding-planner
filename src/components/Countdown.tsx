'use client';

import { useEffect, useState } from 'react';
import { WEDDING_DATE_CQ, WEDDING_DATE_PZ } from '@/data/wedding-data';

interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
}

function calculateCountdown(dateStr: string): CountdownData {
  const target = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff > 0) {
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    };
  }
  return { days: 0, hours: 0, minutes: 0 };
}

function CountdownCard({
  label,
  location,
  dateStr,
  gradient,
  emoji,
}: {
  label: string;
  location: string;
  dateStr: string;
  gradient: string;
  emoji: string;
}) {
  const [data, setData] = useState<CountdownData>({ days: 0, hours: 0, minutes: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculate = () => setData(calculateCountdown(dateStr));
    calculate();
    const timer = setInterval(calculate, 60000);
    return () => clearInterval(timer);
  }, [dateStr]);

  const weddingDate = new Date(dateStr);
  const isPast = new Date() > weddingDate;

  if (!mounted) {
    return (
      <div className={`${gradient} rounded-2xl p-5 text-white shadow-lg`}>
        <div className="text-center">
          <p className="text-white/80 text-xs mb-1">{label}</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-bold">--</span>
            <span className="text-xs text-white/80">天</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${gradient} rounded-2xl p-5 text-white shadow-lg relative overflow-hidden`}>
      {/* Decorative */}
      <div className="absolute top-1 right-3 text-2xl opacity-25">{emoji}</div>
      <div className="absolute bottom-1 left-3 text-xl opacity-15">💕</div>

      <div className="text-center relative z-10">
        <p className="text-white/90 text-xs font-medium mb-0.5">{label}</p>
        <p className="text-white/70 text-[10px] mb-2">📍 {location}</p>

        {isPast ? (
          <p className="text-lg font-bold">🎉 已完成！</p>
        ) : (
          <>
            <div className="flex items-center justify-center gap-3 my-2">
              <div className="text-center">
                <span className="text-4xl font-bold">{data.days}</span>
                <p className="text-[10px] text-white/80 mt-0.5">天</p>
              </div>
              <span className="text-xl opacity-50">:</span>
              <div className="text-center">
                <span className="text-2xl font-bold">{data.hours}</span>
                <p className="text-[10px] text-white/80 mt-0.5">时</p>
              </div>
              <span className="text-xl opacity-50">:</span>
              <div className="text-center">
                <span className="text-2xl font-bold">{data.minutes}</span>
                <p className="text-[10px] text-white/80 mt-0.5">分</p>
              </div>
            </div>
          </>
        )}

        <p className="text-white/70 text-[10px] mt-1">
          📅 {weddingDate.getFullYear()}年{weddingDate.getMonth() + 1}月{weddingDate.getDate()}日
        </p>
      </div>
    </div>
  );
}

export default function Countdown() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <CountdownCard
        label="距重庆婚礼还有"
        location="重庆奉节·兴隆镇"
        dateStr={WEDDING_DATE_CQ}
        gradient="bg-gradient-to-br from-orange-400 via-red-400 to-rose-500"
        emoji="🏔️"
      />
      <CountdownCard
        label="距彭州婚礼还有"
        location="成都彭州市"
        dateStr={WEDDING_DATE_PZ}
        gradient="bg-gradient-to-br from-pink-400 via-pink-500 to-rose-400"
        emoji="💒"
      />
    </div>
  );
}
