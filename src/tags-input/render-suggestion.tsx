import { Tag } from 'react-tag-input'

export function renderSuggestion(item: Tag, query: string) {
  return <span dangerouslySetInnerHTML={markIt(item, query)} />
}

function markIt(item: Tag, query: string) {
  const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
  const { text: labelValue } = item

  return {
    __html: labelValue.replace(RegExp(escapedRegex, 'gi'), x => {
      return `<mark class="bg-blue-200 py-0.5">${encodeURIComponent(x)}</mark>`
    }),
  }
}
