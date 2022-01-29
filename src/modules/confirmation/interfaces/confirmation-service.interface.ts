export interface IConfirmationService {
  sendConfirmationCode: (target: string) => void;
  isConfirmationCodeTrue: (target: string, code: string) => boolean;
}
