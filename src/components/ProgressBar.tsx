'use client';

interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercent?: boolean;
  size?: 'sm' | 'md' | 'lg';
  gradient?: string;
}

export default function ProgressBar({
  progress,
  label,
  showPercent = true,
  size = 'md',
  gradient = 'from-pink-300 via-pink-400 to-pink-500',
}: ProgressBarProps) {
  const heights = { sm: 'h-2', md: 'h-3', lg: 'h-4' };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-gray-600">{label}</span>}
          {showPercent && (
            <span className="text-sm font-semibold text-pink-500">{Math.round(progress)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-pink-100 rounded-full ${heights[size]} overflow-hidden`}>
        <div
          className={`${heights[size]} bg-gradient-to-r ${gradient} rounded-full progress-bar transition-all duration-1000 ease-in-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
