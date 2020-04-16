export default function({ store, $axios, $cookie }, inject) {
  // Create a custom axios instance
  const api = $axios.create()

  api.setBaseURL(`${process.env.API_URL}/api/v1`)

  api.interceptors.request.use(function(config) {
    if (store.$auth.loggedIn) {
      const token = store.$auth.getToken('local')
      api.setHeader('access-token', token['access-token'])
      api.setHeader('client', token.client)
      api.setHeader('uid', token.uid)
    }
    return config
  })

  // Inject to context as $api
  inject('api', api)
}
