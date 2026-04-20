interface WordmarkProps {
  className?: string;
  style?: React.CSSProperties;
}

// "sµbspÅTi∆l" — the brand lockup. Three Latin letters are replaced by scientific
// glyphs: µ (micro sign, U+00B5), Å (ångström, U+00C5), ∆ (increment, U+2206).
// Rendered in Unica One; display is uppercase-style because Unica is an
// uppercase-only display face (no text-transform — that would recase µ → M).
export function Wordmark({ className = "", style }: WordmarkProps) {
  return (
    <span className={`wordmark ${className}`} style={style} aria-label="Subspatial">
      s<span aria-hidden="true">µ</span>bsp<span aria-hidden="true">Å</span>Ti
      <span aria-hidden="true">∆</span>l
    </span>
  );
}
