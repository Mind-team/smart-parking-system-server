![Header](https://user-images.githubusercontent.com/57585370/118314436-942b4c80-b50d-11eb-9a2a-bb62a5808863.png)
# Умная парковочная система (сервер)

## Содержание
1. [Стек технологий](#techStack)
2. [Требования для использования](#requirements)
3. [Порядок установки](#install)
4. [Структура приложения](#structure)
5. [Продукт](#product)
6. [Разработчику](#dev)

## Стек технологий <a name="techStack" />
- Node JS
- Nest JS
- TypeScript
- MongoDB Atlas

## Требования для использования <a name="requirements" />
- Node JS LTS Version

## Порядок установки <a name="install">
1. Нужно установить [Node JS](https://nodejs.org/en/) LTS версию 
2. В корне проекта в терминале прописать команду `npm i`
3. Нужно зарегистрироваться на сайте [MongoDB](https://www.mongodb.com/)
4. Нужно создать новый кластер (при конфигурации можно выбирать любой веб-сервис)
5. Нажать на кнопку connect
<img width="1435" src="https://user-images.githubusercontent.com/57585370/118317123-1a955d80-b511-11eb-8382-c418a8322943.png">

6. Нажать на "Connect your application"
7. Скопировать ссылку
8. В левом меню выберите пункт `Database Access`
9. Создайте пользователя, у котрого будет доступ до бд
10. В ссылке, которую вы скопировали, вместо <password> напишите пароль, который вы указали в созданном пользователе.
А вместо `myFirstDatabase` впишите название кластера 
12. В корне проекта создать файл `.env`
13. Скопировать содержимое файла `.env.example` и вставить в `.env`
14. Вместо плейсхолдела `'mongo_db_link'` вставить ссылку, которую вы копировали с сайта mongoDB (где указан пароль и название кластера)
15. В корне проекта в терминале прописать команду `npm run start:dev` для запуска сервера в режиме разработчика

## Структура приложения <a name="structure" />
- /.github/workflows - github actions
- /src - исходный код
- /src/dtos - дто
- /src/interfaces - интерфейсы
- /src/models - модели
- /src/modules - модули
- /src/schemas - схемы для дб
- /src/types - типы
- /test - e2e тесты

## Продукт <a name="product" />
Сервер, корректно обрабатывающий запросы от камеры и пользователя (полный список возможны запросов хранится в CLIENT-API.md и PARKING-API.md)

## Разработчику <a name="dev">

[**Client API**](https://github.com/Mind-team/smart-parking-system-server/blob/master/CLIENT-API.md)

[**Parking API**](https://github.com/Mind-team/smart-parking-system-server/blob/master/PARKING-API.md)

## Скрипты
Здесь только те скрипты, которыми нужно пользоваться
- `npm run start:dev` - запуск приложения в режиме разработки (автоматически перезапускается при изменении файла. Также приложение не билдится)
- `npm run start:debug`- запуск приложения в режиме дебага
- `npm run lint` - исправление код стайла (если это возможно)
- `npm run test` - запуск тестов
- `npm run test:watch` - запуск тестов с автообновлениями
- `npm run test:cov` - показывает процент покрытия кода тестами 
- `npm run type:coverage` - количество типов any в вашем коде

## Система ответов
### Интерфейсы
- `ServerResponse` - интерфейс для ответов, которые не должны возвращать какую-либо сущность.
То есть сервер просто должен сообщить об успехе или неудаче
- `FilledServerResponse<T>` - интерфейс для ответов, которые должны возвращать какую-либо 
сущность типа T. То есть сервер должен сообщить об успехе или неудаче и вернуть сущность типа T
  
### Классы
На данный момент существует 3 класса, которые реализуют какой-либо интерфейс
- `SuccessfulServerResponse: ServerResponse`
- `FailedServerResponse: ServerResponse`
- `FilledSuccessfulServerResponse<T>: FilledServerResponse<T>`

Если когда-то понадобится возможность возвращать какую-либо сущность при неудачном ответе,
то нужно реализовать `FilledFailedServerResponse<T>: FilledServerResponse<T>` 
  
### Когда использовать
Сервер обязан ответить на каждый запрос, который ему приходит
- Если от сервера требовалось совершить какое-то действие и сервер с этим справился, 
  то нужно вернуть `SuccessfulServerResponse`
- Если от сервера требовалось соверешить какое-то действие, а сервер с этим не справился,
  то нужно вернуть `FailedServerResponse`
- Если от сервера требовалось совершить какое-то действие, а потом вернуть результат
  этого действия и сервер с этим справился, то нужно вернуть `FilledSuccessfulResponse`
- Если от сервера требовалось совершить какое-то действие, а потом вернуть результат 
  этого действия, а сервер с этим не справился, то нужно вернуть `FailedServerResponse`
  
