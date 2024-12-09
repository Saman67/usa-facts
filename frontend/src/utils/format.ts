/**
 * Formats a numeric string value that might be 'unknown' or other non-numeric values.
 * If the value is numeric, it will be formatted with the specified options.
 * If not, it will be returned as is.
 */
export const formatNumericValue = (
  value: string | number,
  options: {
    style?: 'decimal' | 'currency' | 'percent';
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
    suffix?: string;
    currency?: string;
  } = {}
): string => {
  // If value is already a number, convert it to string for consistent handling
  const stringValue = String(value).toLowerCase();

  // Check if the string is a valid number
  const isNumeric = !isNaN(Number(stringValue)) && stringValue !== '';

  if (!isNumeric) {
    return String(value); // Return original value if not numeric
  }

  const numericValue = Number(value);
  
  return new Intl.NumberFormat('en-US', {
    style: options.style || 'decimal',
    currency: options.currency || undefined,
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
  }).format(numericValue) + (options.suffix ? ` ${options.suffix}` : '');
};
