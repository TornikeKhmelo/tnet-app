export const formatPrice = (price?: number | string, currency: string = 'GEL') => {
  if (!price) return currency === 'USD' ? '0 $' : '0 ₾';
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numPrice)) return currency === 'USD' ? '0 $' : '0 ₾';
  const formatted = new Intl.NumberFormat('ka-GE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
  return formatted + (currency === 'USD' ? ' $' : ' ₾');
};

export const formatDate = (dateString?: string | number) => {
  if (!dateString) return '';
  
  let date: Date;
  
  if (typeof dateString === 'number') {
    date = new Date(dateString > 10000000000 ? dateString : dateString * 1000);
  } else if (typeof dateString === 'string') {
    if (dateString.includes('T')) {
      date = new Date(dateString);
    } else if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
      date = new Date(dateString.replace(' ', 'T') + 'Z');
    } else if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      date = new Date(dateString + 'T00:00:00Z');
    } else {
      date = new Date(dateString);
    }
  } else {
    return '';
  }
  
  if (isNaN(date.getTime())) {
    console.warn('Invalid date:', dateString);
    return '';
  }
  
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'დღეს';
  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      if (diffMinutes < 1) return 'ახლა';
      return `${diffMinutes} წუთის წინ`;
    }
    return `${diffHours} საათის წინ`;
  }
  
  if (diffDays === 1) return '1 დღის წინ';
  if (diffDays < 7) return `${diffDays} დღის წინ`;
  
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return '1 კვირის წინ';
  if (diffWeeks < 4) return `${diffWeeks} კვირის წინ`;
  
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return '1 თვის წინ';
  if (diffMonths < 12) return `${diffMonths} თვის წინ`;
  
  const diffYears = Math.floor(diffDays / 365);
  if (diffYears === 1) return '1 წლის წინ';
  return `${diffYears} წლის წინ`;
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