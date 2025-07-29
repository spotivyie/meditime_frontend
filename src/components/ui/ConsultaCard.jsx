const ConsultaCard = ({ icon: Icon, color, count, title }) => {
  return (
    <div className="bg-gray-900 rounded-xl p-4 hover:bg-gray-700">
      <div className="flex items-center space-x-2 mt-2">
        <Icon className={`text-${color}-400 w-8 h-8`} />
        <p className="text-3xl font-bold">{count}</p>
      </div>
      <p className="text-xl my-2">{title}</p>
    </div>
  );
};

export default ConsultaCard;
