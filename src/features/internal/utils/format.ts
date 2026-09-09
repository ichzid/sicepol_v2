export const money = (value: string | number) =>
  typeof value === 'number'
    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
    : value;
