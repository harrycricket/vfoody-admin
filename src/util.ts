export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(dateString: string) {
  const dateObj = new Date(dateString); // Parse the date string
  const hours = dateObj.getHours().toString().padStart(2, '0'); // Add leading zero for single-digit hours
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed (January is 0)
  const year = dateObj.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}

export const formatNumberVND = (q: number | string) => {
  // Handle undefined, null, or empty values
  if (q === undefined || q === null || q === 0) {
    q = 0;
  }

  // Format the number as Vietnamese dong (VND)
  return q.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};
