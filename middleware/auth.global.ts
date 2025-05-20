import type { RouteLocationNormalizedGeneric } from "vue-router";

const NO_AUTH = [ 'index', 'login', 'register' ]

function isAnonymous(route: RouteLocationNormalizedGeneric) {
  for (const name of NO_AUTH) {
    const routeName: string =  String(route.name)
    if (routeName.startsWith(`${name}__`)) return true;
  }
  return false;
}

export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (isAnonymous(to)) return;
  if (import.meta.client) {
    const routeName: string =  String(to.name)
    if (routeName && !routeName.startsWith("index__") && !useAuth().authenticated) return navigateTo('/login');
  }
});