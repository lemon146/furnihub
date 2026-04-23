export interface CategoryImage {
  url: string;
  publicId?: string;
  alt?: string;
}

export interface CategoryType {
  id: string;
  name: string;
  image: CategoryImage;
}
