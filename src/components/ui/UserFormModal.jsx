export default function UserFormModal ({ children, className }) {
  return (
    <div className={`space-y-6 bg-gray-900 max-w-sm mx-auto p-8 rounded ${className}`}>
      {children}
    </div>
  );
}
