const NO_AUTH = [ 'index', 'login', 'register' ]

function isAnonymous(route) {
  for (const name of NO_AUTH) {
    if (route.name.startsWith(`${name}__`)) return true;
  }
  return false;
}

export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (isAnonymous(to)) return;
  if (import.meta.client) {
    if (!to.name.startsWith("index__") && !useAuth().authenticated) return navigateTo('/');
  }
});