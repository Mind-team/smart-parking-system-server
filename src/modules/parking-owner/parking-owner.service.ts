import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  NewParkingOwnerConstructor,
  ParkingOwner,
} from '../../core/parking-owner';
import { ParkingOwnerMongoService } from '../mongo';
import { ParkingOwnerMapperService } from '../mongo/mappers';
import { JwtWrapperService } from '../auth';

@Injectable()
export class ParkingOwnerService {
  constructor(
    private readonly parkingOwnerMongoService: ParkingOwnerMongoService,
    private readonly parkingOwnerMapperService: ParkingOwnerMapperService,
    private readonly jwtService: JwtWrapperService,
  ) {}

  async registerParkingOwner(data: NewParkingOwnerConstructor): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const model = new ParkingOwner(data);
    try {
      const modelData = model.data();
      const { refreshToken, accessToken } = this.jwtService.generateTokens({
        id: modelData._id,
      });
      await this.parkingOwnerMongoService.save(
        this.parkingOwnerMapperService.toDB(model, {
          refreshToken,
        }),
      );
      return { refreshToken, accessToken };
    } catch (e) {
      throw new InternalServerErrorException(
        'Что-то пошло не так --- ' + e.message,
      );
    }
  }
}
