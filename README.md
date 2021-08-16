# Консольное приложение для публикации страниц на github

Run with NPX

```
npx cli_ghp_deployer ghp-deploy

```

create run script in package.json

```json
  "scripts": {
    "deploy:ghp": "cli_ghp_deployer ghp-deploy d"
    }
```

Опции:

| Ключ | Опция        | Описание                                                                                                                                                                                                            | Значение по умолчанию                      |
| ---- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| o    | owner        | [Владелец репозитория](https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/managing-user-account-settings/permission-levels-for-a-user-account-repository) куда деплоится директория | Вычисляется из текущего GIT репозитория    |
| b    | branch       | Ветка в Git репозитории для деплоя проекта                                                                                                                                                                          | gh-pages                                   |
| r    | repository   | Репозиторий куда помещается код для деплоя                                                                                                                                                                          |                                            |
| t    | token        | [Токен GitHub](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) владельца                                                          | Значение переменной окружения GITHUB_TOKEN |
| d    | directory    | директория для деплоя                                                                                                                                                                                               | dist                                       |
| a    | buildCommand | Скрипт для сборки приложения                                                                                                                                                                                        |                                            |
