import { LUKE_SKYWALKER_ID, BASE_PATH } from './constants.js'
import { useFetchJSON } from './utils.js'

export const getPerson = async (id) => {
  const url = `${BASE_PATH}people/${id}`

  const result = await useFetchJSON(url)

  if (!result) {
    throw new Error('Something went wrong')
  }

  return result
}
