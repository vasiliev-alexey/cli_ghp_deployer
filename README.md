# Консольное приложение для публикации страниц на github

Run with NPX

```
npx cli_ghp_deployer ghp-deploy -d deploy_dir -r test_repo_for_publish

```

![](./doc/npx.gif)

create run script in package.json

```json
  "scripts": {
      "deploy": "ts-node  src/index.ts  ghp-deploy -d deploy_dir -r test_repo_for_publish "
    }
```

![](./doc/node.gif)

Опции:

| Ключ | Опция        | Описание                                                                                                                                                                                                            | Значение по умолчанию                      |
| ---- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| o    | owner        | [Владелец репозитория](https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/managing-user-account-settings/permission-levels-for-a-user-account-repository) куда деплоится директория | Вычисляется из текущего GIT репозитория    |
| b    | branch       | Ветка в Git репозитории для деплоя проекта                                                                                                                                                                          | gh-pages                                   |
| r    | repository   | Репозиторий куда помещается код для деплоя                                                                                                                                                                          |                                            |
| t    | token        | [Токен GitHub](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) владельца                                                          | Значение переменной окружения GITHUB_TOKEN |
| d    | directory    | директория для деплоя                                                                                                                                                                                               | dist                                       |
| a    | buildCommand | Скрипт для сборки приложения                                                                                                                                                                                        |                                            |

При отсутствии необходимых опций - будет предложено ввести их в командной строке

Есть небольшая [проблема при использовании через NPX](https://github.com/tschaub/gh-pages/issues/354) -
требуется наличие package.json в каталоге
