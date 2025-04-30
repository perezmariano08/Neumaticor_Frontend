export function formatDate(fechaISO) {
  const fecha = new Date(fechaISO);
  
  const opciones = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // 24hs
  };

  // Esto ya te lo devuelve ajustado a tu horario local
  return fecha.toLocaleString('es-AR', opciones).replace(',', '');
}


