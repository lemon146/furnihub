// export interface Review {
//   _id: string;
//   product: { _id: string; title: string };
//   user: { _id: string; fullName: string };
//   rating: number;
//   comment: string;
//   createdAt: string;
//   updatedAt: string;
// }

export interface ReviewUser {
  _id: string;
  fullName: string;
}

export interface ReviewReply {
  user: ReviewUser;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  product: {
    _id: string;
    title: string;
    averageRating?: number;
    numReviews?: number;
  };
  user: ReviewUser;
  rating: number;
  comment: string;
  reply?: ReviewReply;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  pendingReplies: number;
  fiveStarReviews: number;
}
