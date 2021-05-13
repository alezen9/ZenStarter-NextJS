
type User = {
  _id: string
  name: string
  surname: string
}

// example
export const formatMe = (user: User) => {
  return {
    ...user,
    fullName: `${user.surname} ${user.name}`
  }
}
