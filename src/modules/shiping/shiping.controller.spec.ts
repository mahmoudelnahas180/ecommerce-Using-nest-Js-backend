import { Test, TestingModule } from '@nestjs/testing';
import { ShipingController } from './shiping.controller';

describe('ShipingController', () => {
  let controller: ShipingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipingController],
    }).compile();

    controller = module.get<ShipingController>(ShipingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
