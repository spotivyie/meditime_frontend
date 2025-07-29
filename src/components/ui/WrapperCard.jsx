export default function WrapperCard({ children, className = '' }) {
  return (
    <div className={`pt-6 rounded mx-auto space-y-4 ${className}`}>
      {children}
    </div>
  );
}
