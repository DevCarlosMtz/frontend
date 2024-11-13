export default async ({ $auth, redirect, next }) => {
  let user = await $auth.user;

  if (!user) {
    return redirect({ name: 'auth.login' });
  }

  return next();
}
