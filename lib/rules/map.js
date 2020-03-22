'use strict';
const MESSAGE = 'Array native method can be used instead of lodash method';

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: MESSAGE,
            category: 'ECMAScript 6',
            recommended: true,
        },
        fixable: 'whitespace',
        schema: [],
    },

    create: (context) => {
        const sourceCode = context.getSourceCode();

        return {
            CallExpression(node) {
                if (!node.callee || node.callee.type !== 'MemberExpression' || !node.arguments) return;

                const { callee } = node;
                const hasLodashObjectWithPropertyMap = callee.object && callee.property
                    && callee.object.type === 'Identifier'
                    && callee.object.name === '_'
                    && callee.property.type === 'Identifier'
                    && callee.property.name === 'map'
                    && Array.isArray(node.arguments)
                    && node.arguments.length === 2;

                if (!hasLodashObjectWithPropertyMap) return;

                const [firstArgument, secondArgument] = node.arguments;

                switch (firstArgument.type) {
                    case 'ArrayExpression':
                        const arrayText = sourceCode.getText().slice(firstArgument.range[0], firstArgument.range[1]);

                        context.report({
                            node: node,
                            message: MESSAGE,
                            fix: (fixer) => fixer.replaceTextRange(
                                [node.range[0], secondArgument.range[0]],
                                `${arrayText}.map(`,
                            ),
                        });
                        break;

                    case 'ObjectExpression':
                        // С объектом ничего делать не надо
                        break;

                    default:
                        const sourceText = sourceCode.getText();
                        const firstArgumentText = sourceText.slice(firstArgument.range[0], firstArgument.range[1]);
                        const secondArgumentText = sourceText.slice(secondArgument.range[0], secondArgument.range[1]);

                        const textBeforeNode = `Array.isArray(${firstArgumentText}) ? ${firstArgumentText}.map(${secondArgumentText}) : `;

                        context.report({
                            node: node,
                            message: MESSAGE,
                            fix: (fixer) => fixer.insertTextBefore(node, textBeforeNode),
                        });
                        break;
                }
            },
        };
    },
};
