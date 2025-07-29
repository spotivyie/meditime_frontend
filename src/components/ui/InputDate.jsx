export default function InputDate({ 
    label, 
    value, 
    onChange, 
    className = '', 
    ...props 
}) {
    return (
        <div>
            {label && <label className="block font-medium mb-1">{label}</label>}

            <input
                type="date"
                value={value}
                onChange={onChange}
                className={`w-40 p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                {...props}
            />
        </div>
    );
}
