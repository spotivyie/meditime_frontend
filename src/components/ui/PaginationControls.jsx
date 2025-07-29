export default function PaginationControls({
  page,
  totalPages,
  handlePrev,
  handleNext,
  setPageNumber,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={handlePrev}
        disabled={page === 0}
        className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
      >
        Anterior
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setPageNumber(index)}
          className={`px-3 py-1 rounded ${
            page === index ? 'bg-gray-900 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={page === totalPages - 1}
        className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
      >
        Próximo
      </button>
    </div>
  );
}
