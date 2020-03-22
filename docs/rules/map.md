# map (lodash-to-native/map)

В библиотеке Lodash есть функция map. Она может использоваться как с массивами, так и с объектами.

Правило находит использование функции _.map, и, если это возможно, предлагает заменить его на использование нативного Array#map.

## Rule Details

Examples of **incorrect** code for this rule:

```js

  // Lodash/Underscore
  var array = _.map([1, 2, 3], function (value) {
    return value * 2;
  });
  console.log(array);
  // output: [2, 4, 6]

```

Examples of **correct** code for this rule:

```js

  // Native
  var array = [1, 2, 3].map(function (value) {
    return value * 2;
  });
  console.log(array);
  // output: [2, 4, 6]

```
