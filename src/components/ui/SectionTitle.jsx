export default function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`text-2xl font-bold mb-4 ${className}`}>
      {children}
    </h2>
  );
}
