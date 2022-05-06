
export const useTryCatch = async (fn) => {
  const state = {
    data: null,
    error: null,

    get hasData() {
      return state.data !== null
    },

    get hasError() {
      return state.error !== null
    }
  }

  try {
    state.data = await fn()
  } catch (error) {
    state.error = error
  }
  return state
}


export const useFetchJSON = async (url) => {
  const { data, error, hasData, hasError } = await useTryCatch(() => fetch(url))

  if (hasError) {
    throw error
  }

  return hasData ? await data.json() : null
}

export const addContent = (element, content) => {
  if (!element) {
    throw new Error('Invalid element')
  }

  element.textContent = content
}

export const createListHTML = (rawData) => {
  const listHTML = document.createElement('ul')

  rawData.forEach((element) => {

    const listItemElementHTML = document.createElement('li')

    addContent(listItemElementHTML, element)

    listHTML.appendChild(listItemElementHTML)
  })
  return listHTML
}

