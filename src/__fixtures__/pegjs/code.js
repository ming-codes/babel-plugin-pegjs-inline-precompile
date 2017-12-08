import peg from 'pegjs-inline-precompile'

export default {
  expression: peg`
    Value = .+
  `,
}
