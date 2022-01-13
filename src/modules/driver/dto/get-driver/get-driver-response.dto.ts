export class GetDriverResponseDto {
  _id: string;
  carPlates: string[];
  parkingProcessIds: string[];
  currentParkingProcessId: string | null;
  phoneNumber: string;
  password: string;
  email?: string;
  type: 0 | 1;
}
