const METALS = [
  { sym: "AU", name: "Gold", price: "$2,377.40", change: "▲+1.28%", up: true },
  { sym: "AG", name: "Silver", price: "$28.96", change: "▲+0.85%", up: true },
  { sym: "PT", name: "Platinum", price: "$983.50", change: "▼-0.35%", up: false },
  { sym: "PD", name: "Palladium", price: "$1,032.90", change: "▲+0.12%", up: true },
  { sym: "CU", name: "Copper", price: "$4.87/lb", change: "▲+0.2%", up: true },
];

export default function MetalsTicker() {
  const items = [...METALS, ...METALS];
  return (
    <div className="pm-ticker">
      <div className="pm-tlbl"><span><span className="pm-ldot" />LIVE</span></div>
      <div className="pm-ticker-track">
        {items.map((m, i) => (
          <div className="pm-ti" key={i}>
            <span className="pm-ts">{m.sym}</span>
            <span>{m.name}</span>
            <span className="pm-tp">{m.price}</span>
            <span className={m.up ? "pm-tu" : "pm-td"}>{m.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
