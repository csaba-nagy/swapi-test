import { LUKE_SKYWALKER_ID } from './constants.js'
import { getPerson } from './getPerson.js'
import { useFetchJSON, useTryCatch } from './utils.js'

export const getMovies = async (id = LUKE_SKYWALKER_ID) => {
  const person = await useTryCatch(() => getPerson(id))
  const moviesPath = person.data.films.length !== 0 ? person.data.films : null

  if (!moviesPath) {
    return null
  }

  const result = await Promise.all(moviesPath.map((movie) => useFetchJSON(movie)))
  return result.map((movie) => movie.title)
}
