# API Parking
## Содержание
| Метод | URL | Описание |
| ------------- | ------------- | ------------- |
| POST | `parking/registerCarEntry` | Регистрирует въезд машины |
| POST | `parking/registerCarDeparture` | Регистрирует выезд машины |

### POST `parking/registerCarEntry`
**Регистрирует въезд машины** <br>

Ожидает: [`RegisterCarEntryDto`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/dtos/register-car-entry.dto.ts)

Возвращает: [`ServerResponse`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/interfaces/server-responses/server-response.interface.ts)

---

### POST `parking/registerCarDeparture`
**Регистрирует выезд машины** <br>

Ожидает: [`RegisterCarDepartureDto`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/dtos/register-car-departure.dto.ts)

Возвращает: [`ServerResponse`](https://github.com/Mind-team/smart-parking-system-server/blob/master/src/interfaces/server-responses/server-response.interface.ts)
