export default function ActionButton({
  onClick,
  children,
  color = 'blue',
  className = '',
  disabled = false,
}) {
  const colors = {
    blue: 'bg-blue-600 hover:bg-blue-700 text-white',
    yellow: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    green: 'bg-green-700 hover:bg-green-800 text-white',
  };

  const colorClasses = colors[color] || colors.blue;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-2 py-1 rounded transition ${colorClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
