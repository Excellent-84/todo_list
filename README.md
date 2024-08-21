## «ToDo list»

### Описание проекта:
Приложение для планирования задач. Авторизованные пользователи могут создавать проекты, редактировать их и удалять. Каждый проект имеет свои статусы задач (столбцы), их можно добавлять, редактировать, удалять и менять их порядок. К статусам прикрепляются задачи, их также можно добавлять, редактировать, удалять, менять порядок и перемещать между статусами. Авторизация пользователей по JWT-токену. Пользователи могут работать только с собственными записями.

### Стек технологий:
<img src="https://img.shields.io/badge/typescript-FFFFFF?style=for-the-badge&logo=typescript&logoColor=3178C6"/><img src="https://img.shields.io/badge/node.js-FFFFFF?style=for-the-badge&logo=node.js&logoColor=5FA04E"/><img src="https://img.shields.io/badge/nestjs-FFFFFF?style=for-the-badge&logo=nestjs&logoColor=E0234E"/><img src="https://img.shields.io/badge/typeorm-FFFFFF?style=for-the-badge&logo=typeorm&logoColor=FE0803"/><img src="https://img.shields.io/badge/PostgreSQL-FFFFFF?style=for-the-badge&logo=PostgreSQL&logoColor=4169E1"/><img src="https://img.shields.io/badge/swagger-FFFFFF?style=for-the-badge&logo=swagger&logoColor=85EA2D"/>

### Как запустить проект:

##### Клонировать репозиторий и перейти в него в командной строке:

```bash
$ git clone https://github.com/Excellent-84/todo_list.git
$ cd todo_list
```

##### Создать файлы .env, .development.env, .production.env
##### и указать необходимые токены по примеру .env.example:

```bash
$ touch .env .development.env .production.env
```
##### Установить зависимости:

```bash
$ npm install
```

##### Запуск приложения:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Документация и примеры запросов к API с помощью Postman доступна по адресу:

```bash
$ http://127.0.0.1:3000/api/docs
```

#### Автор: [Горин Евгений](https://github.com/Excellent-84)
