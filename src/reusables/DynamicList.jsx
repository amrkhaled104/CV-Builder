import "./DynamicList.css";
export default function DynamicList({ items, renderItem }) {
  return <div className="dynamic-list">{items.map(renderItem)}</div>;
}
