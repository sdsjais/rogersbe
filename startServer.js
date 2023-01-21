'use strict'

import { SERVER_CONFIG, MONGO_CONFIG } from './config'

const { PORT } = SERVER_CONFIG

const startServer = async (app) => {
  try {
    // Connect to MongoDB
    // await MONGO_CONFIG.mongoConnect()
    // console.log('[Info] MongoDB Connected')

    // Start Listening on Configured Port
    await app.listen(PORT)
    console.log(`[Info] Server Started Successfully! Listening on Port: ${PORT}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default startServer
