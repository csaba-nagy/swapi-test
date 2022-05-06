import { BASE_PATH } from './constants.js'
import { useFetchJSON, useTryCatch } from './utils.js'

export const getPerson = async (id) => {
  const url = `${BASE_PATH}people/${id}`

  const { data, error, hasData, hasError } = await useTryCatch(() => useFetchJSON(url))

  if (hasError) {
    throw error
  }

  return hasData ? data : null
}

export const getAllPerson = async (url, result = []) => {
  const data = await useFetchJSON(url)

  if (!data.next) {
    return result
  }

  data.results.forEach((person) => result.push(person.name))

  return await getAllPerson(data.next, result)
}
