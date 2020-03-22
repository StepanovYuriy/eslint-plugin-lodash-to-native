'use strict';
const rule = require('../../../lib/rules/map');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });
ruleTester.run('map', rule, {

    valid: [
        '_.map({a: 1, b: 2}, fn);',
    ],

    invalid: [
        {
            code: 'map fail',
            errors: [{
                message: 'Fill me in.',
                type: 'Me too',
            }],
        },
    ],
});
