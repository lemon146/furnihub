export interface AdditionalInfo {
  material: string;
  color: string;
  weight: number;
  dimension: string;
}

export interface ProductImage {
  url: string;
  publicId: string;
  _id?: string;
}

export interface ProductCategory {
  _id: string;
  title: string;
  description?: string;
  image?: { url: string; publicId: string };
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  short_desc: string;
  images: ProductImage[];
  category: ProductCategory;
  additionalInfo: AdditionalInfo;
  averageRating: number;
  numReviews: number;
  originalPrice: number;
  price: number;
  stock: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
