export default function AuthButton({
  children,
}) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded font-bold"
    >
      {children}
    </button>
  );
}
