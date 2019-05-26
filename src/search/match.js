import { clean } from 'diacritic'

export default (text, query) => {
  query = clean(query)
    .toLowerCase()
    .replace(/\W+/g, ' ')
    .replace(/^\s+/g, '')
  text = clean(text)
    .toLowerCase()
    .replace(/\W/g, ' ')
  const regexp = new RegExp(`\\b${query}`, 'i')
  const index = text.search(regexp)
  return index >= 0 ? [[index, index + query.length]] : []
}
