export type NewRegisteredDriverConstructor = {
  phoneNumber: string;
  password: string;
  email?: string;
  parkingProcessIds: string[];
  carPlates: string[];
};
