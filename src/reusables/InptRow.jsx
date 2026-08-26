import "./InputRow.css";
export default function InputRow({ children, columns = 2 }) {
  return (
    <div
      className="input-row"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
      }}
    >
      {children}
    </div>
  );
}
