import React from 'react';
//hooks
import useReports from '../../hooks/useReports';
//components
import WrapperCard from '../../components/ui/WrapperCard';
import SectionTitle from '../../components/ui/SectionTitle';
import EmptyState from '../../components/ui/EmptyState';
import ErrorMessage from '../../components/ui/ErrorMessage';
import ConsultationsByDayChart from '../../components/chart/ConsultationsByDayChart';
import ConsultationsByMonthChart from '../../components/chart/ConsultationsByMonthChart';
import MostRequestedDoctorsChart from '../../components/chart/MostRequestedDoctorsChart';
//icons
import { CalendarDays, Stethoscope, LineChart as LineChartIcon } from 'lucide-react';

export default function AdminReports() {
  const token = localStorage.getItem('token');
  const { reports, loading, error } = useReports(token);

  return (
    <WrapperCard>
      <SectionTitle>Relatórios e Estatísticas</SectionTitle>

      {loading ? (
        <EmptyState message="Carregando dados..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <div className='bg-gray-900 rounded-xl pt-6 pb-10 px-4'>
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <LineChartIcon className="w-6 h-6 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-200">Consultas por Dia</h3>
            </div>

            {reports.consultationsByDay?.length === 0 ? (
              <EmptyState message="Nenhuma consulta registrada para este mês." />
            ) : (
              <ConsultationsByDayChart data={reports.consultationsByDay} />
            )}
          </section>

          <div className="flex flex-col lg:flex-row gap-20 pt-10">
            <section className="w-full lg:w-1/2 bg-transparent">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <CalendarDays className="w-5 h-5" /> Consultas por Mês
              </h3>
              {reports.consultationsByMonth?.length === 0 ? (
                <EmptyState message="Nenhuma consulta registrada." />
              ) : (
                <ConsultationsByMonthChart data={reports.consultationsByMonth} />
              )}
            </section>

            <section className="w-full lg:w-1/2">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Stethoscope className="w-5 h-5" /> Médicos Mais Requisitados
              </h3>
              {reports.doctorStats?.length === 0 ? (
                <EmptyState message="Nenhuma consulta registrada." />
              ) : (
                <MostRequestedDoctorsChart data={reports.doctorStats} />
              )}
            </section>
          </div>
        </div>
      )}
    </WrapperCard>
  );
}
