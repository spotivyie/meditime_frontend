export const formatConsultationsByDay = (data) => {
  return data?.map(({ _id: day, count }) => ({ date: day, count }));
};

export const formatConsultationsByMonth = (data) => {
  return data?.map(({ _id: month, count }) => ({ month, count }));
};

export const formatDoctorStats = (data) => {
  return data?.map(({ doctorName, count }) => ({ name: doctorName, count }));
};

export const filterByCurrentMonth = (data) => {
  if (!data) return [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return data.filter((item) => {
    const itemDate = new Date(item._id);
    return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
  });
};
