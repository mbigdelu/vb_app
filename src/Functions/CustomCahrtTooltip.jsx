export default function CustomChartTooltip({ active, label, payload }) {
  console.log(payload);
  if (active && payload && payload.length) {
    return (
      <div className="bg-prim rounded-5 shadow px-5 py-3 opacity-75">
        <p className="pt-3 text-black">{payload[0].name}</p>

        <p className="opacity-100 text-black">Value: {payload[0].value}</p>
      </div>
    );
  }

  return null;
}
