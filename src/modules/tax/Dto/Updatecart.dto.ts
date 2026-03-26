import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateCartQuantityDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}
