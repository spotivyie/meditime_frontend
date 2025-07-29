import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ViewResultButton({ examId }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/exames/resultado/${examId}`)}
      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      <Eye size={16} />
      Ver Resultado
    </button>
  );
}
