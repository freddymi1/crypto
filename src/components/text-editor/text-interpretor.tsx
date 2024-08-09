import escapeHTML from 'escape-html'
import { Node, Text } from 'slate'

const SerializeToPlainText = (nodes: Node[] | any): any => {
  if (!Array.isArray(nodes)) {
    return ''
  }

  return nodes
    .flatMap((n: any) => {
      let text = escapeHTML(n.text)

      if (n.bold) {
        return `<b>${text}</b>`
      }
      if (n.italic) {
        return `<em>${text}</em>`
      }
      if (n.underline) {
        return `<u>${text}</u>`
      }
      if (n.strikethrough) {
        return `<s>${text}</s>`
      }
      if (n.indent === 1) {
        return `<ul className="ml-3.5"><li className="list-items">${SerializeToPlainText(
          n.children
        )}</li></ul>`
      }

      if (Text.isText(n)) {
        let string = escapeHTML(n.text)
        return string
      } else if (n.type === 'p' && n.listStyleType === undefined) {
        return `<p> ${SerializeToPlainText(n.children)}</p>`
      } else if (n.type === 'quote') {
        return `> ${SerializeToPlainText(n.children)}`
      } else if (n.type === 'a') {
        return `<a className="article-link" target="_blank" href='${
          n.url
        }'>${SerializeToPlainText(n.children)}</a>`
      } else if (n.type === 'img') {
        return `<img className="content-imgs w-full md:w-[200px]" src="${SerializeToPlainText(
          n.children
        )}${n.url}"/>`
      } else {
        return []
      }
    })
    .join('\n')
}

export default SerializeToPlainText
