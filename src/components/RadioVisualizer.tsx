type Props = {
  active?: boolean;
  bars?: number;
  className?: string;
};

export function RadioVisualizer({ active = false, bars = 5, className = '' }: Props) {
  return (
    <div
      className={`radio-viz${active ? ' radio-viz-live' : ''}${className ? ` ${className}` : ''}`}
      aria-hidden
    >
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.11}s` }} />
      ))}
    </div>
  );
}
