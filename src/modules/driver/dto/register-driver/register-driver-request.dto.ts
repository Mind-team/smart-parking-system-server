export class RegisterDriverRequestDto {
  phoneNumber: string;
  password: string;
  email?: string;
  carPlates: string[];
}
