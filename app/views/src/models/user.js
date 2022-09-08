
export const userModel = (user) => {
  return {
    userId: user.userId,
    username: user.username,
    email: user.email,
    roles: user.roles
  }
}