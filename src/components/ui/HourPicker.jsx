import EmptyState from "./EmptyState";

export default function HourPicker({ label, hours = [], selected, onSelect, loading }) {
  return (
    <div>
      {label && <label className="block font-medium mb-1">{label}</label>}

      {loading ? (
        <EmptyState message="Carregando horários..." />
      ) : hours.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {hours.map((hour) => (
            <button
              key={hour}
              type="button"
              onClick={() => onSelect(hour)}
              className={`px-4 py-2 rounded border border-gray-600 ${
                selected === hour ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'
              }`}
            >
              {hour}
            </button>
          ))}
        </div>
      ) : (
        <EmptyState message="Nenhum horário disponível." />
      )}
    </div>
  );
}
