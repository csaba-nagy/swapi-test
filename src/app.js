import { getMovies } from './getMovies.js'
import { useTryCatch, addContent } from './utils.js'

const app = document.querySelector('#app')
const statusElement = document.createElement('div')
const resultElement = document.createElement('div')

useTryCatch(main)
  .then(() => addContent(statusElement, 'STATUS: Done'))
  .catch(() => addContent(statusElement, 'STATUS: Failure, an error occured'))

async function main() {

  [statusElement, resultElement].forEach((child) => app.appendChild(child))

  addContent(statusElement, 'Loading...')

  const { data: movieTitles, error, hasData, hasError } = await useTryCatch(() => getMovies())

  if (hasError) {
    throw error
  }

  if (!hasData) {
    return addContent(resultElement, 'No results')
  }

  const filmListElement = document.createElement('ul')
  movieTitles.sort().forEach((title) => {
    const filmListItemElement = document.createElement('li')

    addContent(filmListItemElement, title)

    filmListElement.appendChild(filmListItemElement)
  })

  app.appendChild(filmListElement)
}
