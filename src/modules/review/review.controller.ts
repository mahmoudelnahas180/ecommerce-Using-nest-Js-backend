import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './Review.Dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post('')
  createReview(@Body() body: CreateReviewDto) {
    return this.reviewService.createReview(body);
  }
  @Get('')
  getReviews(@Query('page') page?: string, @Query('limit') limit?: string) {
    if (!page && !limit) {
      return this.reviewService.getAllReviews();
    }

    return this.reviewService.getReviewsByPagination({
      page: Number(page) || 1,
      limit: Number(limit) || 5,
    });
  }
  @Get(':id')
  getReview(@Param('id') id: string) {
    return this.reviewService.getReviewById(id);
  }
  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
  @Patch(':id')
  updateReview(
    @Param('id') id: string,
    @Body() body: Partial<CreateReviewDto>,
  ) {
    return this.reviewService.updateReview(id, body);
  }
}
