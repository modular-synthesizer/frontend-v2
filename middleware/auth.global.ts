const NO_AUTH = [ 'index', 'login', 'register' ]

function isAnonymous(route) {
  for (const name of NO_AUTH) {
    if (route.name.startsWith(`${name}__`)) return true;
  }
  return false;
}

export default defineNuxtRouteMiddleware(async (to, _from) => {
  // TODO implement the authenticated function to correctly check the state.
  const authenticated = false;
  const anonymous = isAnonymous(to)
  if (import.meta.client || anonymous || authenticated) return;
  return navigateTo('/');
})