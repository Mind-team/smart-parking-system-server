import { Recorder } from './recorder.interface';
import { PlateRecord } from '../records/plate-record.infrastructure';

export class PlateRecorder implements Recorder<PlateRecord> {
  public formatForDB(model: PlateRecord): PlateRecord {
    return {
      value: this.verify(this.format(model.value)),
    };
  }

  private format(plateValue: string) {
    return plateValue.toLowerCase();
  }

  private verify(plateValue: string) {
    if (
      plateValue.length === 6 &&
      !isNaN(Number(plateValue.substring(1, 3))) &&
      isNaN(Number(plateValue[0])) &&
      isNaN(Number(plateValue[4])) &&
      isNaN(Number(plateValue[5]))
    ) {
      return plateValue;
    }
    throw new Error('Invalid plate format');
  }
}
