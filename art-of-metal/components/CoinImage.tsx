"use client";

export default function CoinImage({
  src,
  alt,
  style,
  fallbackStyle,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  fallbackStyle?: React.CSSProperties;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={style}
      onError={(e) => {
        const el = e.currentTarget;
        el.style.display = "none";
        const parent = el.parentElement;
        if (parent) {
          const span = document.createElement("span");
          Object.assign(span.style, fallbackStyle ?? { fontSize: "80px", opacity: "0.08", color: "#C9A84C" });
          span.textContent = "⬡";
          parent.appendChild(span);
        }
      }}
    />
  );
}
