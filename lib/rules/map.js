'use strict';

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'use native map for array',
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
                            message: 'Нужно использовать нативный Array#map',
                            fix: (fixer) => fixer.replaceTextRange(
                                [node.range[0], secondArgument.range[0]],
                                `${arrayText}.map(`,
                            ),
                        });
                        break;

                    case 'ObjectExpression':
                        // С объектом ничего делать не надо
                        break;

                    case 'Identifier':
                        const sourceText = sourceCode.getText();
                        const firstArgumentText = sourceText.slice(firstArgument.range[0], firstArgument.range[1]);
                        const secondArgumentText = sourceText.slice(secondArgument.range[0], secondArgument.range[1]);

                        const textBeforeNode = `(Array.isArray(${firstArgumentText})) ?
                            ${firstArgumentText}.map(${secondArgumentText}): 
                            `;

                        context.report({
                            node: node,
                            message: 'Можно использовать нативный Array#map',
                            suggest: [
                                {
                                    desc: 'Добавить проверку, что первый параметр является массивом',
                                    fix: (fixer) => fixer.insertTextBefore(node, textBeforeNode),
                                },
                            ],
                        });
                        break;

                    default:
                        break;
                }
            },
        };
    },
};
