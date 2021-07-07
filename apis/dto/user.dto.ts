interface UserDto {
  phoneNumber: string;
  password: string; // hashed
  email?: string;
  plates: string[];
  parkings: ParkingDto[];
}
