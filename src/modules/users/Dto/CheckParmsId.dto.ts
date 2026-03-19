import { IsMongoId } from 'class-validator';
export class FindOneParams {
  @IsMongoId({ message: 'not vaild id' })
  id: string;
}
// import { IsMongoId } from 'class-validator';
