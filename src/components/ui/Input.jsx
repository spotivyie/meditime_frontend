export default function Input({
    label,
    type = 'text',
    value,
    onChange,
    options = [],
    textarea = false,
    select = false,
    ...props
}) {
    return (
        <div>
            {label && <label className="block font-medium mb-1">{label}</label>}

            {select ? (
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...props}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                        {opt.label}
                        </option>
                    ))}
                </select>
            ) : textarea ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    className="w-full p-3 rounded resize-none bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...props}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...props}
                />
            )}
        </div>
    );
}
