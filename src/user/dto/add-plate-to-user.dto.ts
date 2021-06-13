export class AddPlateToUserDto {
  phoneNumber: string;
  password: string;
  plate: string;
}

// // Business logic
// interface User {
//   get email(): string;
//   get login(): string;
//   get password(): number;
// }
//
// class StandardUser implements User {
//   readonly #email: string;
//   readonly #login: string;
//   readonly #password: number;
//
//   constructor(email: string, login: string, password: number) {
//     this.#email = email;
//     this.#login = login;
//     this.#password = password;
//   }
//
//   public get email() {
//     return this.#email;
//   }
//
//   public get login() {
//     return this.#login;
//   }
//
//   public get password() {
//     return this.#password;
//   }
// }
//
// // Infrastructure
// interface UserRepository {
//   email: string;
//   login: string;
//   password: number;
// }
//
// interface Recorder<T, K> {
//   formatForDB: (repository: T) => K;
// }
//
// class UserRecorder implements Recorder<User, UserRepository> {
//   public formatForDB(repository: User) {
//     return {
//       email: repository.email,
//       login: repository.login,
//       password: repository.password,
//     }
//   }
// }
//
// // DTO
// class GetUserInfo {
//   constructor(public password: number) {}
// }
//
// // Controller
// class UserController {
//
//   // GET
//   public userInfo(dto: GetUserInfo) {
//
//   }
// }
//
// // Service
// interface IUserService {
//   userInfo(password: { value: number }): User;
// }
//
// class UserService {
//   public userInfo(password: { value: number }) {
//
//   }
// }

