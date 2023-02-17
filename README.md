# UI-тесты для социальной сети ВКонтакте
## Описание
UI-тесты для социальной сети ВКонтакте, написанные на NodeJS с использованием Playwright.
### Установка
```bash
npm install
```

### Запуск тестов
```bash
npm test
```

### Установка envrioment variables и secrets
Для локального запуска тестов нужно создать в корневой папке файл **.env** с переменными описанными ниже:
<br>
Для прохождения тестов через pipeline также необходимо добавить следующие secrets в GitHub:
- VK_PASSWORD - пароль пользователя ВКонтакте
- VK_PHONE - номер телефона пользователя ВКонтакте
- VK_ID - ID пользователя ВКонтакте
____

## Описание тестов
### 👩‍💻 Авторизация в ВК через номер телефона и пароль
#### Шаги
1. Открыть главную страницу ВК
2. Ввести номер телефона в поле «Телефон или почта»
3. Нажать кнопку «Войти»
4. На открывшейся странице нажать кнопку «Войти при помощи пароля»
5. Ввести пароль в поле «Введите пароль»
6. Нажать кнопку «Продолжить»
   - Пользователь авторизован
   - Открылась страница Новостей
### 👍 Установка лайка посту
#### Шаги
1. Открыть страницу Новостей авторизованным пользователем
2. Поставить лайк на первом посте в ленте
   - Лайк поставлен
### 📜 Публикация приватной записи с темой IT на странице
#### Шаги
1. Открыть страницу профиля пользователя
2. Нажать на поле «Что у вас нового?»
3. Ввести любой текст записи
4. Нажать на кнопку «Видно всем»
5. Выбрать из дропдауна «Видно друзьям»
6. Нажать на кнопку «Тематика»
7. Выбрать из дропдауна «IT»
8. Нажать на кнопку «Опубликовать»
   - Запись с видимостью только друзьям и тематикой IT опубликована
   - Запись появилась на странице пользователя
### 📢 Подписка на официальное сообщество Хабр
#### Шаги
1. Открыть страницу Сообщества
2. Ввести «Хабр» в поле «Поиск сообществ»
3. Нажать кнопку поиска
   - Отобразятся результаты поиска
4. Нажать на кнопку «Подписаться» в строке официального сообщества «Хабр»
   - Пользователь подписан на сообщество
   - Кнопка «Подписаться» изменится на «Вы подписаны»
5. Обновить страницу
   - В списке сообществ есть «Хабр»
### 💬️ Создание нового чата
1. Открыть страницу Мессенджер авторизованным пользователем
2. Нажать на иконку создания нового чата
3. Ввести название чата в поле «Введите название чата»
4. Ввести имя и фамилию пользователя в поле «Введите имя или фамилию»
5. Нажать кнопку «Создать чат»
   - Созданный чат отображается в списке чатов
   - Открыта форма созданного чата
