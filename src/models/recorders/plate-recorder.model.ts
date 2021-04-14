import { Recorder } from '../../interfaces/recorder.interface';
import { PlateRecord } from '../../interfaces/records/plate-record.interface';

export class PlateRecorder implements Recorder<PlateRecord> {
  public async formatForDB(model: PlateRecord) {
    const rightPlate = this.toRightFormat(model.value);
    return { value: this.verify(rightPlate) };
  }

  private toRightFormat(plateName: string) {
    return plateName.toLowerCase();
  }

  private verify(plateName: string) {
    if (
      plateName.length === 6 &&
      !isNaN(Number(plateName.substring(1, 3))) &&
      isNaN(Number(plateName[0])) &&
      isNaN(Number(plateName[4])) &&
      isNaN(Number(plateName[0]))
    ) {
      return plateName;
    }
    throw new Error('Invalid plate format');
  }
}
