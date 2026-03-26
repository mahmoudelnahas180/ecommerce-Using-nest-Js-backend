import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './Review.Schema';
import { CreateReviewDto } from './Review.Dto';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}
  async createReview(body: CreateReviewDto) {
    const review = await this.reviewModel.create(body);
    return {
      message: 'Review created successfully',
      review: review,
    };
  }
  async getAllReviews() {
    const reviews = await this.reviewModel.find();
    return reviews;
  }
  async getReviewsByPagination({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) {
    const reviews = await this.reviewModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
    return reviews;
  }
  async getReviewById(id: string) {
    const review = await this.reviewModel.findById(id);
    return review;
  }
  async deleteReview(id: string) {
    const review = await this.reviewModel.findByIdAndDelete(id);
    return review;
  }
  async updateReview(id: string, body: Partial<CreateReviewDto>) {
    const review = await this.reviewModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return review;
  }
}
