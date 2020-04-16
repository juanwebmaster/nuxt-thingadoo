export default function({ app, store, redirect }) {
  const { $axios, $auth } = app

  $axios.onResponse((res) => {
    const originalRequest = res.config

    if (
      (originalRequest.url === '/auth/sign_in' ||
        originalRequest.url === '/auth') &&
      res.status === 200
    ) {
      const authData = {
        'access-token': res.headers['Access-Token'],
        client: res.headers.client,
        uid: res.headers.uid
      }
      // console.log(authData)
      $auth.setToken('local', authData['access-token'])
    }
  })
}
