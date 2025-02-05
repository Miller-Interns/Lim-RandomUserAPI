export type Name = {
  title: string
  first: string
  last: string
}

export type Street = {
  number: number
  name: string
}

export type Coordinates = {
  latitude: string
  longitude: string
}

export type Timezone = {
  offset: string
  description: string
}

export type Location = {
  street: Street
  city: string
  state: string
  country: string
  postcode: string | number // Can be string (US ZIP) or number
  coordinates: Coordinates
  timezone: Timezone
}

export type Login = {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

export type DOB = {
  date: string
  age: number
}

export type Registered = {
  date: string
  age: number
}

export type ID = {
  name: string
  value: string | null
}

export type Picture = {
  large: string
  medium: string
  thumbnail: string
}

export type User = {
  gender: string
  name: Name
  location: Location
  email: string
  login: Login
  dob: DOB
  registered: Registered
  phone: string
  cell: string
  id: ID
  picture: Picture
  nat: string
}
