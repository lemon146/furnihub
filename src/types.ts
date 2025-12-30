// Category type
export interface Category {
  name: string;
  img: string; // image URL
  path: string;
}

// Review type
export interface Review {
  user: string;
  rating: number;
  comment: string;
}

// Additional info type
export interface AdditionalInfo {
  material?: string;
  color?: string;
  weight?: string;
  dimensions?: string;
  capacity?: string; // for items like mugs
}

// Product type
export interface Product {
  id: number;
  category?: string; // optional for some products
  image: string; // local image import or URL
  title: string;
  shortDesc: string;
  description: string;
  additionalInfo?: AdditionalInfo;
  reviews?: Review[];
  rating: number;
  price: number;
  originalPrice: number;
  stock?: number;
  reviewsCount?: number;
  material?: string;
  color?: string;
  dimensions?: string;
}
