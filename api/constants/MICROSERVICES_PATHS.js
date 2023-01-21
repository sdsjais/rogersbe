'use strict'

import { MICROSERVICES_ENDPOINTS } from '../../config'

const { BLUTO_OAUTH } = MICROSERVICES_ENDPOINTS


const janusOauth = {
  handshake :{
    callHandshake: BLUTO_OAUTH + 'auth/handshake'
  }
}


const MICROSERVICES_PATHS = {
  janusOauth,
}

export default MICROSERVICES_PATHS
