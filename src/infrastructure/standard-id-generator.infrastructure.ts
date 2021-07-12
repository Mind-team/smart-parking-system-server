import { IdGenerator } from '../models/interfaces/id-generator.interface';
import { v4 as uuid } from 'uuid';

export class StandardIdGenerator implements IdGenerator {
  generate() {
    return uuid();
  }
}
