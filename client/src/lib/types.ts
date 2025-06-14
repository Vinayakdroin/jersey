export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  team: string;
}

export interface FilterOptions {
  category?: string;
  sortBy?: 'popular' | 'featured' | 'price-low' | 'price-high';
  searchQuery?: string;
}

export interface GoogleFormData {
  jerseyName: string;
  jerseyPrice: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  size?: string;
}
