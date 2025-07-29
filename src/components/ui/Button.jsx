export default function Button({
  children,
  onClick,
  disabled = false,
  fullWidth = false, 
  className = '', 
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded font-medium
        bg-gray-300 text-black
        hover:bg-gray-100
        transition duration-200
        ${fullWidth ? 'w-full py-3' : 'px-4 py-2'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
