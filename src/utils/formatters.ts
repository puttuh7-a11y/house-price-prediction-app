// Format as Indian Rupees
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    maximumFractionDigits: 0 
  }).format(value);

// Format percentages (no change needed)
export const formatPercent = (v: number) =>
  `${(v * 100).toFixed(0)}%`;
