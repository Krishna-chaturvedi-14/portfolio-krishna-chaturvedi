interface LegoStudsProps {
  rows?: number;
  cols?: number;
  color?: string;
  className?: string;
}

export const LegoStuds = ({ 
  rows = 2, 
  cols = 4, 
  color = 'currentColor',
  className = '' 
}: LegoStudsProps) => {
  return (
    <div 
      className={`absolute top-2 left-2 grid gap-2 pointer-events-none ${className}`}
      style={{ 
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full opacity-25 animate-stud-pulse"
          style={{ 
            backgroundColor: color,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};
