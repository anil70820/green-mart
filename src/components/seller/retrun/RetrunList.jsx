import RetrunCard from "./RetrunCard";

export default function RetrunList({
  data,
  selected,
  onSelect,
  setReturnSidebar,
}) {
  return (
    <div className="flex-1 overflow-y-auto space-y-2">
      {data.map((item) => (
        <RetrunCard
          key={item.id}
          item={item}
          active={selected?.id === item.id}
          onClick={() => {
            onSelect(item);
            setReturnSidebar(true);
          }}
        />
      ))}
    </div>
  );
}
