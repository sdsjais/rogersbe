'use strict'

const {
  BLUTO_OAUTH = '',
} = process.env

const REQUIRED_CONFIG = [
  // 'BLUTO_OAUTH',
]

REQUIRED_CONFIG.forEach(key => {
  if (!process.env[key]) {
    console.error('[Error] Missing MICROSERVICES_ENDPOINTS:', key)
    return process.exit(1)
  }
})

const MICROSERVICES_ENDPOINTS = {
  BLUTO_OAUTH,
}

export default MICROSERVICES_ENDPOINTS
