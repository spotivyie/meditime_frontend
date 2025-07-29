const ExamCard = ({ title, subtitle, data, }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-400">{subtitle}</p>
      <p className="text-gray-400 mb-4">Data: {new Date(data).toLocaleDateString('pt-BR')}</p>
    </div>
  );
};

export default ExamCard;
