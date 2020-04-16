export default {
  strategies: {
    local: {
      _scheme: '~/strategies/local.js',
      endpoints: {
        login: {
          url: '/auth/sign_in',
          method: 'post',
          propertyName: false
        },
        logout: { url: '/auth/sign_out', method: 'post' },
        user: {
          url: '/api/v1/users/check-login',
          method: 'post',
          propertyName: false
        }
      },
      tokenRequired: true,
      tokenType: false,
      tokenName: false
    }
  },
  plugins: [{ src: '~/plugins/auth.js', mode: 'client' }]
}
