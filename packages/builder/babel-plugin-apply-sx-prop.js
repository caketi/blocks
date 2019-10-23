import template from '@babel/template'

export default (api, { elementId }) => {
  const { types: t } = api

  return {
    visitor: {
      JSXOpeningElement(path) {
        const id = path.node.attributes.find(
          node => node && node.name && node.name.name === '___tuid'
        )

        if (!id || id.value.value !== elementId) {
          return
        }

        const sxProp = path.node.attributes.find(
          node => node && node.name && node.name.name === 'sx'
        )

        if (!sxProp) {
          path.node.attributes.push(
            t.jSXAttribute(
              t.jSXIdentifier('sx'),
              template.ast(`<>{{border: 'thin solid tomato'}}</>`, {
                plugins: ['jsx']
              }).expression.children[0]
            )
          )
        } else {
          debugger
          sxProp.value.expression.properties.push(
            t.objectProperty(
              t.identifier('border'),
              t.stringLiteral('thin solid tomato')
            )
          )
        }
      }
    }
  }
}