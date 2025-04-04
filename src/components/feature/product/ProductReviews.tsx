"use client";

import type React from "react";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";

interface ProductReviewsProps {
  productId: number;
}

interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ProductReviews({}: ProductReviewsProps) {
  const { isAuthenticated, user } = useAuth();
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      userId: "user-1",
      userName: "John D.",
      rating: 5,
      comment:
        "Excellent quality and craftsmanship. The attention to detail is impressive.",
      date: "2023-05-15",
    },
    {
      id: 2,
      userId: "user-2",
      userName: "Sarah M.",
      rating: 4,
      comment:
        "Beautiful product, exactly as described. Shipping was a bit slow but worth the wait.",
      date: "2023-04-22",
    },
    {
      id: 3,
      userId: "user-3",
      userName: "Michael T.",
      rating: 5,
      comment:
        "I've purchased several items from this shop and they never disappoint. This is another great addition to my collection.",
      date: "2023-03-10",
    },
  ]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || userRating === 0) return;

    const newReview: Review = {
      id: Date.now(),
      userId: user?.id || "guest",
      userName: user?.name || "Guest",
      rating: userRating,
      comment,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([newReview, ...reviews]);
    setUserRating(0);
    setComment("");
  };

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div>
      <div className="mb-6">
        <div className="mb-2 flex items-center">
          <div className="mr-2 flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= averageRating
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="font-medium">
            {averageRating.toFixed(1)} out of 5
          </span>
          <span className="ml-2 text-sm text-gray-500">
            ({reviews.length} reviews)
          </span>
        </div>
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleSubmitReview} className="mb-8">
          <h3 className="mb-4 text-lg font-medium">Write a Review</h3>
          <div className="mb-4">
            <div className="flex items-center">
              <p className="mr-2">Your rating:</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setUserRating(star)}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= (hoverRating || userRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <Textarea
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <Button
            type="submit"
            disabled={userRating === 0}
            className="bg-primary hover:bg-primary/90"
          >
            Submit Review
          </Button>
        </form>
      ) : (
        <div className="mb-8 rounded-md bg-gray-50 p-4 text-center">
          <p className="mb-2 text-gray-600">Please sign in to leave a review</p>
          <Button variant="outline">Sign In</Button>
        </div>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{review.userName}</span>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
