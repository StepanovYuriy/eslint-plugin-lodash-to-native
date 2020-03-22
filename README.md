# eslint-plugin-lodash-to-native

Плагин для замены функций библиотеки Lodash нативными аналогами.

## Установка

Установка [ESLint](http://eslint.org):

```
$ npm i -D eslint
```

Установка плагина `eslint-plugin-lodash-to-native`:

```
$ npm i -D https://github.com/StepanovYuriy/eslint-plugin-lodash-to-native.git
```

## Применение

Добавить в файл конфигурации `.eslintrc` плагин и правило:

```json
{
    "plugins": [
        "lodash-to-native"
    ],
    "rules": {
        "lodash-to-native/map": "warn"
    }
}
```

## Список правил

+ [lodash-to-native/map](./docs/rules/map.md): Array native method "map" can be used instead of lodash method
