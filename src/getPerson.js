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
