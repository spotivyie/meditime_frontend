export default function FileInput({
  label = 'Arquivo',
  file,
  onChange,
  accept = '',
  preview = true,
}) {
  const isImage = file && file.type?.startsWith('image/');
  const fileName = file?.name || '';

  return (
    <div>
      {label && (
        <label className="block text-gray-300 font-medium mb-2">{label}</label>
      )}

      <label
        htmlFor="fileInput"
        className="flex w-64 xl:w-80 items-center justify-center cursor-pointer rounded border-2 border-dashed border-gray-600 p-6 text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-colors"
      >
        <span className="truncate max-w-full">
          {fileName || 'Clique para selecionar o arquivo'}
        </span>
      </label>

      <input
        id="fileInput"
        type="file"
        accept={accept}
        onChange={e => onChange(e.target.files[0])}
        className="hidden"
      />

      {preview && isImage && (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview do arquivo"
          className="mt-4 max-h-40 rounded-md object-contain border border-gray-600"
        />
      )}
    </div>
  );
}
