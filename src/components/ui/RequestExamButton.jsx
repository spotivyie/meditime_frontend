export default function RequestExamButton({ onClick, loading, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`px-5 py-2 rounded text-white transition w-full md:w-auto ${
        loading || disabled
          ? 'bg-blue-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {loading ? 'Solicitando...' : 'Solicitar Exame'}
    </button>
  );
}
