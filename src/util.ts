export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatTimeToSeconds(dateString: string) {
  const dateObj = new Date(dateString); // Parse the date string
  const hours = dateObj.getHours().toString().padStart(2, '0'); // Add leading zero for single-digit hours
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed (January is 0)
  const year = dateObj.getFullYear();

  return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
}

export function formatDate(dateString: string) {
  const dateObj = new Date(dateString); // Parse the date string
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed (January is 0)
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}

export const formatCurrency = (value: number | string) => {
  // Handle undefined, null, or empty values
  if (value === undefined || value === null) {
    value = 0;
  }

  // Format the number as Vietnamese dong (VND)
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};

export const formatNumber = (value: number | string) => {
  if (value === undefined || value === null) {
    value = 0;
  }

  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const formatPhoneNumber = (phone: string) => {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3];
  }
  return null;
};
