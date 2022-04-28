
const showProfile = async (id) => {
  const person = await getPersonById(id)
  console.log('Person:', person)

  const starships = await getStarshipsByPerson(person)
  console.log('Starships:', starships)

  const movies = await getMoviesByPerson(person)
  console.log('Movies:', movies)

  const vehicles = await getVehiclesByPerson(person)
  console.log('Vehicles:', vehicles)
}

//people, starships, films, vehicles
const getPersonById = (id) => {
  const route = new URL(`https://swapi.dev/api/people/${id}`)

  const result = fetchRoute(route)

  return result
}

const getStarshipsByPerson = (person) => {
  const starshipRoutes = person.starships

  if (starshipRoutes.length === 0) {
    return new Error('No starships here')
  }

  const result = []

  starshipRoutes.forEach(element => {
    const starship = fetchRoute(element)
    starship.then(value => result.push(value))
  });

  return result
}

const getMoviesByPerson = (person) => {
  const movieRoutes = person.films

  if (movieRoutes.length === 0) {
    return new Error('No movies here')
  }

  const result = []
  //TODO: Use an array map function instead
  movieRoutes.forEach(element => {
    const movie = fetchRoute(element)
    movie.then(value => result.push(value))
  });

  return result
}

const getVehiclesByPerson = (person) => {
  const vehicleRoutes = person.vehicles

  if (vehicleRoutes.length === 0) {
    return new Error('No vehicles here')
  }

  const result = []
  //TODO: Use an array map function instead
  vehicleRoutes.forEach(element => {
    const vehicle = fetchRoute(element)
    vehicle.then(value => result.push(value))
  });

  return result
}

const fetchRoute = async (route) => {
  const data = await fetch(route)

  if (!data) {
    return new Error('400 Bad Request')
  }

  const result = await data.json()

  return result
}

showProfile(parseInt(prompt('Give me a user ID...')))
