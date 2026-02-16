interface CardProps {
  title?: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, icon, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-pink-100 p-5 card-hover ${className}`}>
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}
