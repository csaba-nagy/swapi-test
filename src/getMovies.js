import { LUKE_SKYWALKER_ID } from './constants.js'
import { getPerson } from './getPerson.js'
import { useFetchJSON, useTryCatch } from './utils.js'

export const getMovies = async (id = LUKE_SKYWALKER_ID) => {

  const { data: person, error, hasData, hasError } = await useTryCatch(() => getPerson(id))

  if (hasError) {
    throw error
  }

  const moviesPath = person.films.length !== 0 ? person.films : null

  if (!moviesPath) {
    return `${person.name} does not appear in any movies`
  }

  const result =
    hasData
      ? await Promise.all(moviesPath.map((movie) => useTryCatch(() => useFetchJSON(movie))))
      : null

  return result ? result.map((movie) => movie.data.title) : result
}
