'use strict'

import { ResponseBody } from '../helpers'
import { AIModel } from '../models'

const AIController = {
    getStart, 
    getModelResponse,
    getRd 
}

export default AIController

async function getStart(request, response, next) {
  if (response.body) { return process.nextTick(next) }

  const { body } = request
  const data = await AIModel.getStart(body)
  const responseBody = new ResponseBody(200, 'OK', data)
  response.body = responseBody
  next()
}
async function getModelResponse(request, response, next) {
    if (response.body) { return process.nextTick(next) }
  
    const { body } = request
    const data = await AIModel.getModelResponse(body)
    const responseBody = new ResponseBody(200, 'OK', data)
    response.body = responseBody
    next()
  }

async function getRd(request, response, next) {
    if (response.body) { return process.nextTick(next) }
    
    const { body } = request
    const data = await AIModel.getRd(body)
    const responseBody = new ResponseBody(200, 'OK', data)
    response.body = responseBody
    next()
  }
