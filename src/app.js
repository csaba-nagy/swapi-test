import { PEOPLE_PATH } from './constants.js'
import { getMovies } from './getMovies.js'
import { getAllPerson } from './getPerson.js'
import { useTryCatch, addContent, createListHTML } from './utils.js'

const app = document.querySelector('#app')
const statusElement = document.createElement('div')
const resultElement = document.createElement('div')

useTryCatch(main)
  .then(() => addContent(statusElement, 'STATUS: Done'))
  .catch(() => addContent(statusElement, 'STATUS: Failure, an error occurred'))

async function main() {

  [statusElement, resultElement].forEach((child) => app.appendChild(child))

  addContent(statusElement, 'Loading...')

  const movies = await useTryCatch(() => getMovies())

  if (movies.hasError) {
    throw movies.error
  }

  if (!movies.hasData) {
    return addContent(resultElement, 'No results')
  }

  app.appendChild(createListHTML(movies.data.sort()))

  const characters = await useTryCatch(() => getAllPerson(PEOPLE_PATH))

  if (characters.hasError) {
    throw characters.error
  }

  if (!characters.hasData) {
    return addContent(resultElement, 'No results')
  }

  app.appendChild(createListHTML(characters.data))
}

