// @flow
import pluginTester from 'babel-plugin-tester'
import plugin from '.'
import path from 'path'

pluginTester({
  plugin,
  fixtures: path.join(__dirname, '__fixtures__'),
})
