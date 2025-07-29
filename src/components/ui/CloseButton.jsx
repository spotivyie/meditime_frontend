export default function CloseButton({ 
  onClick, 
  className = '', 
  children = 'Cancelar' 
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded border border-gray-400 text-gray-300 hover:text-white hover:bg-gray-600 transition ${className}`}
    >
      {children}
    </button>
  );
}
