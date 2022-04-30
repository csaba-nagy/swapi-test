
const showProfile = async (id) => {
  try {
    const person = await getPersonById(id)
    console.log('Person:', person)

    const starships = await getStarshipsByPerson(person)
    console.log('Starships:', starships)

    const movies = await getMoviesByPerson(person)
    console.log('Movies:', movies)

    const vehicles = await getVehiclesByPerson(person)
    console.log('Vehicles:', vehicles)
  } catch (error) {
    console.error(error.message)
  }
}

const getPersonById = (id) => {
  const route = `https://swapi.dev/api/people/${id}`

  return fetchRoute(route)
}

const getStarshipsByPerson = async (person) => {
  const starshipRoutes = person.starships

  if (starshipRoutes.length === 0) {
    return `${person.name} does not have starhips`
  }

  return await Promise.all(starshipRoutes.map(async (route) => await fetchRoute(route)))
}

const getMoviesByPerson = (person) => {
  const movieRoutes = person.films

  if (movieRoutes.length === 0) {
    return `${person.name} does not appear in any movies`
  }

  return Promise.all(movieRoutes.map(async (route) => await fetchRoute(route)))
}

const getVehiclesByPerson = (person) => {
  const vehicleRoutes = person.vehicles

  if (vehicleRoutes.length === 0) {
    return `${person.name} does not have vehicles`
  }

  return Promise.all(vehicleRoutes.map(async (route) => await fetchRoute(route)))
}

const fetchRoute = async (route) => {
  try {
    const data = await fetch(route)

    if (data.status !== 200) {
      throw new Error('400 Bad Request')
    }

    return await data.json()

  } catch (error) {
    console.error(error.message)
  }
}

showProfile(1)
