export function formatDate(dateString) {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString('pt-BR') +
    ' às ' +
    date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  );
}
