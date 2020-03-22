'use strict';
const rule = require('../../../lib/rules/map');
const RuleTester = require('eslint').RuleTester;

const MESSAGE = 'Array native method can be used instead of lodash method';

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });
ruleTester.run('map', rule, {

    valid: [
        '_.map({a: 1, b: 2}, fn);',
        '[2, 3, 4].map(fn);',
    ],

    invalid: [
        {
            code: '_.map([1, 2, 3], fn);',
            errors: [{ message: MESSAGE }],
            output: '[1, 2, 3].map(fn);',
        },
        {
            code: `const collection = []; _.map(collection, fn);`,
            errors: [{ message: MESSAGE }],
            output: 'const collection = []; Array.isArray(collection) ? collection.map(fn) : _.map(collection, fn);',
        },
    ],
});
