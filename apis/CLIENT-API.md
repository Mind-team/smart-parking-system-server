# API Client
## Содержание
| Метод | URL | Описание |
| ------------- | ------------- | ------------- |
| POST | `user/signUp` | Создает нового пользователя |
| POST | `user/signIn` | Авторизует пользователя |
| POST | `user/addPlate` | Добавляет регистрационный знак пользователю |
| POST | `user/lastParkingHistoryElement` | Возвращает последнюю запись паркинга пользователя |

### POST `user/signUp`
**Создает нового пользователя в бд** <br>

Ожидает: [`SignUpDto`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/user/dto/sign-up.dto.ts)

Возвращает: [`ServerResponse`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/infrastructure/server-responses/server-response.interface.ts)

---

### POST `user/signIn`
**Авторизует пользователя** <br>

Ожидает: [`SignInDto`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/user/dto/sign-in.dto.ts)

Возвращает: [`FilledServerResponse<T>`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/infrastructure/server-responses/filled-server-response.interface.ts), где T - [`UserDto`](https://github.com/Mind-team/smart-parking-system-server/blob/master/apis/dto/user.dto.ts)

---

### POST `user/addPlate`
**Добавляет регистрационный знак пользователю** <br>

Ожидает: [`AddPlateToUserDto`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/user/dto/add-plate-to-user.dto.ts)

Возвращает: [`ServerResponse`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/infrastructure/server-responses/server-response.interface.ts)

---

## POST `user/lastParkingHistoryElement`
**Возвращает последнюю запись паркинга пользователя**

Ожидает: [`SignInDto`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/dtos/sign-in.dto.ts)

Возвращает: [`FilledServerResponse<T>`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/infrastructure/server-responses/filled-server-response.interface.ts), где T - [`ParkingDto`](https://github.com/Mind-team/smart-parking-system-server/blob/master/apis/dto/parking.dto.ts)
