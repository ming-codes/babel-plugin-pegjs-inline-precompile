// @flow
import peg from 'pegjs'
import { parseExpression } from 'babylon'

export default ({ types: t }) => {
  return {
    name: 'babel-plugin-pegjs-inline-precompile',
    visitor: {
      TaggedTemplateExpression(path, state) {
        let name = path.node.tag.name
        let quasi = path.node.quasi
        let element = quasi.quasis[0]

        if (name === 'peg') {
          if (quasi.expressions.length) {
            // TODO throw error here, dont support inlined expression
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
