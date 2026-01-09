export const formatPrice = (price?: number | string, currency: string = 'GEL') => {
  if (!price) return currency === 'USD' ? '0 $' : '0 ₾';
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numPrice)) return currency === 'USD' ? '0 $' : '0 ₾';
  const formatted = new Intl.NumberFormat('ka-GE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
  return formatted;
};


export const formatDate = (dateInput?: string | number) => {
  if (!dateInput) return '';

  const date = new Date(
    typeof dateInput === 'number'
      ? dateInput > 1e12
        ? dateInput
        : dateInput * 1000
      : dateInput.includes(' ')
      ? dateInput.replace(' ', 'T') + 'Z'
      : dateInput
  );

  if (isNaN(date.getTime())) return '';

  const diffMs = Date.now() - date.getTime();

  const hour = 1000 * 60 * 60;
  const day = 24 * hour;
  const week = 7 * day;

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${Math.max(1, hours)} საათის წინ`;
  }

  if (diffMs < 2 * day) {
    return '1 დღის წინ';
  }

  if (diffMs < 2 * week) return '1 კვირის წინ';
  if (diffMs < 3 * week) return '2 კვირის წინ';
  if (diffMs < 4 * week) return '3 კვირის წინ';

  return '3 კვირის წინ';
};


export const gearTypes = {
  1:"მექანიკა",
  2:"ავტომატიკა",
  3:"ტიპტრონიკი"
}
export const fuelTypes = {
  1:"გაზი",
  2:"ბენზინი",
  3:"დიზელი",
  6:"ჰიბრიდი",
  8:"თხევადი გაზი"
}

export const vehicleTypeToId: { [key: string]: number } = {
  'car': 0,
  'tractor': 1,
  'motorcycle': 2
};