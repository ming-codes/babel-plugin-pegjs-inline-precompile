// @flow
import peg from 'pegjs'
import { parseExpression } from 'babylon'

export default (babel:any) => {
  let t:any = babel.types;

  return {
    name: 'babel-plugin-pegjs-inline-precompile',
    visitor: {
      // Modified from https://github.com/ember-cli/babel-plugin-htmlbars-inline-precompile/blob/master/index.js#L8-L23
      ImportDeclaration(path:any, state:any) {
        let node = path.node;

        if (t.isLiteral(node.source, { value: 'pegjs-inline-precompile' })) {
          let first = node.specifiers && node.specifiers[0];

          if (!t.isImportDefaultSpecifier(first)) {
            let input = state.file.code;
            let usedImportStatement = input.slice(node.start, node.end);
            let msg = `Only \`import hbs from 'pegjs-inline-precompile'\` is supported. You used: \`${usedImportStatement}\``;
            throw path.buildCodeFrameError(msg);
          }

          state.importId = state.importId || path.scope.generateUidIdentifierBasedOnNode(path.node.id);
          path.scope.rename(first.local.name, state.importId.name);
          path.remove();
        }
      },

      TaggedTemplateExpression(path:any, state:any) {
        let name = path.node.tag.name
        let quasi = path.node.quasi
        let element = quasi.quasis[0]

        if (name === state.importId.name) {
          if (quasi.expressions.length > 0) {
            throw path.buildCodeFrameError('placeholders inside a tagged template string are not supported');
          }

          let ast = parseExpression(
            peg.generate(element.value.cooked, {
              output: 'source',
            }),
            { startLine: element.loc.start.line },
          )

          path.replaceWith(ast)
        }
      },
    },
  }
}
