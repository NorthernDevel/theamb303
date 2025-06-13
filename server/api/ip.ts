export default defineEventHandler((event) => {
  const ip =
    getHeader(event, 'x-forwarded-for')?.split(',')[0] || // real IP if behind proxy
    getRequestIP(event) || // Nuxt 3 helper
    event.node.req.socket.remoteAddress ||
    'Unknown'

  return { ip }
})
