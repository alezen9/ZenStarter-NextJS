// come examples below, the key is the error from the server and the value is the mapped message on the fronted
export const ServerMessage = Object.freeze({
  system_permission_denied: 'Permission denied!',
  system_confirmation_code_expired: 'This link is expired, try recreating an account in 15 minutes',
  user_unauthenticated: 'Unauthenticated!',
  user_username_already_exists: 'Username already exists',
  generic: 'An error occoured on the server'
})
