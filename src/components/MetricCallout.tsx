interface MetricCalloutProps {
  number: string;
  caption: string;
}

export function MetricCallout({ number, caption }: MetricCalloutProps) {
  return (
    <div className="flex items-baseline gap-5">
      <span className="metric-big">{number}</span>
      <span
        className="text-[14px] leading-snug max-w-[200px]"
        style={{ color: "var(--ink-faint)" }}
      >
        {caption}
      </span>
    </div>
  );
}
