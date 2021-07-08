interface UserDto {
  phoneNumber: string;
  password: string;
  email?: string;
  plates: string[];
  parkings: ParkingDto[];
}
