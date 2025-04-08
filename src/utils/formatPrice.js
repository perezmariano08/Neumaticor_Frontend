export const formatPrice = price => {
  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    currency: 'ARS',
  }).format(price);
};
