import { GoogleFormData } from './types';

// Default Google Form URL - replace with actual form URL
const DEFAULT_FORM_URL = import.meta.env.VITE_GOOGLE_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSfXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/viewform';

// Form field entry IDs - replace with actual field IDs from your Google Form
const FORM_FIELDS = {
  jerseyName: import.meta.env.VITE_FORM_FIELD_JERSEY_NAME || 'entry.1234567890',
  jerseyPrice: import.meta.env.VITE_FORM_FIELD_JERSEY_PRICE || 'entry.0987654321',
  customerName: import.meta.env.VITE_FORM_FIELD_CUSTOMER_NAME || 'entry.1122334455',
  customerEmail: import.meta.env.VITE_FORM_FIELD_CUSTOMER_EMAIL || 'entry.2233445566',
  customerPhone: import.meta.env.VITE_FORM_FIELD_CUSTOMER_PHONE || 'entry.3344556677',
  size: import.meta.env.VITE_FORM_FIELD_SIZE || 'entry.4455667788',
};

export function openGoogleForm(data: GoogleFormData): void {
  const params = new URLSearchParams();
  
  // Add jersey information
  params.append(FORM_FIELDS.jerseyName, data.jerseyName);
  params.append(FORM_FIELDS.jerseyPrice, data.jerseyPrice);
  
  // Add customer information if provided
  if (data.customerName) {
    params.append(FORM_FIELDS.customerName, data.customerName);
  }
  if (data.customerEmail) {
    params.append(FORM_FIELDS.customerEmail, data.customerEmail);
  }
  if (data.customerPhone) {
    params.append(FORM_FIELDS.customerPhone, data.customerPhone);
  }
  if (data.size) {
    params.append(FORM_FIELDS.size, data.size);
  }
  
  const formUrl = `${DEFAULT_FORM_URL}?${params.toString()}`;
  
  // Open in new tab
  window.open(formUrl, '_blank', 'noopener,noreferrer');
}

export function formatPrice(priceInPaise: number): string {
  return `₹${(priceInPaise / 100).toLocaleString('en-IN')}`;
}
