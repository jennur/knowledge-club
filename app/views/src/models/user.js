
export const userModel = (user) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    roles: user.roles
  }
}