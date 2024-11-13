export default async ({ $auth, next }) => {
  if ($auth.loggedIn) {
    await $auth.logout()
  }

  //return next();
}
