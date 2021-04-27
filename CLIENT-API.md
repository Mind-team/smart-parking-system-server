# API Client
## Содержание
| Метод | URL | Описание |
| ------------- | ------------- | ------------- |
| POST | `user/signUp` | Создает нового пользователя |
| POST | `user/signIn` | Авторизует пользователя |
| POST | `user/addPlate` | Добавляет регистрационный знак пользователю |

### POST `user/signUp`
**Создает нового пользователя в бд** <br>

Ожидает: [`SignUpDto`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/dtos/sign-up.dto.ts)

Возвращает: [`ServerResponse`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/interfaces/server-responses/server-response.interface.ts)

---

### POST `user/signIn`
**Авторизует пользователя** <br>

Ожидает: [`SignInDto`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/dtos/sign-in.dto.ts)

Возвращает: [`FilledServerResponse<T>`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/interfaces/server-responses/filled-server-response.interface.ts), где T - [`UserRecord`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/interfaces/records/user-record.interface.ts)

---

### POST `user/addPlate`
**Добавляет регистрационный знак пользователю** <br>

Ожидает: [`AddPlateToUserDto`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/dtos/add-plate-to-user.dto.ts)

Возвращает: [`ServerResponse`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/interfaces/server-responses/server-response.interface.ts)
