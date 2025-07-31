// export function formatDate(dateString) {
//   const date = new Date(dateString);
//   return (
//     date.toLocaleDateString('pt-BR') +
//     ' às ' +
//     date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
//   );
// }
export function formatDate(dateString) {
  const date = new Date(dateString);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone,
  }).format(date);
}
