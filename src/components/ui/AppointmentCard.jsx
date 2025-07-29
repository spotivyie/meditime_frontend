const AppointmentCard = ({ icon: Icon, color, label, value }) => (
  <div className="flex items-center gap-3">
    <Icon className={`w-6 h-6 text-${color}-500`} />
    <p><strong>{label}:</strong> {value}</p>
  </div>
);

export default AppointmentCard;
