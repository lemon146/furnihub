export interface Review {
  _id: string;
  product: { _id: string; title: string };
  user: { _id: string; fullName: string };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
