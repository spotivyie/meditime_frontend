export default function ExamInput({
  label,
  type = 'text',
  value,
  onChange,
  options = [],
  textarea = false,
  select = false,
  placeholder = '',
  ...props
}) {
  return (
    <div>
      {label && <label className="block font-medium mb-1">{label}</label>}

      {select ? (
        <select
          value={value}
          onChange={onChange}
          className="flex w-64 xl:w-80 p-3 mb-2 rounded bg-gray-800 text-white border border-gray-600"
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex w-64 xl:w-80 resize-none px-4 py-2 rounded border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...props}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex w-64 xl:w-80 p-3 mb-2 rounded bg-gray-800 text-white border border-gray-600"
          {...props}
        />
      )}
    </div>
  );
}
