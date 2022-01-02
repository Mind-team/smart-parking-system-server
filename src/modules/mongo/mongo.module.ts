import { Module } from '@nestjs/common';
import { DriverMongoService } from './services/driver-mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from './schemas/driver.schema';
import { Token } from './enums/token.enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.Driver, schema: DriverSchema }]),
  ],
  providers: [DriverMongoService],
  exports: [DriverMongoService],
})
export class MongoModule {}
