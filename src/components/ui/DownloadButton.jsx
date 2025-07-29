export default function DownloadButton({ url }) {
    return (
        <div className="mb-4 flex justify-end">
            <a
                href={url}
                download
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                target="_blank"
                rel="noopener noreferrer"
            >
                Ver Resultado (PDF)
            </a>
        </div>
    );
}
