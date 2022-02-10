module.exports = {
  reactStrictMode: true,
  rewrites: () => [
    { source: '/api/proxy/:path*', destination: 'http://localhost:8008/:path*' }
  ]

}
