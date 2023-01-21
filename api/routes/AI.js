import Express from 'express'
import { expressUtils } from '../helpers'
import { AIController } from '../controllers'

const AIRouter = new Express.Router()
const { getStart, getModelResponse, getRd } = AIController

const { reqHandler } = expressUtils
const { routeSanity, asyncWrapper } = reqHandler

AIRouter.post('/start', routeSanity, asyncWrapper(getStart))
AIRouter.post('/send', routeSanity, asyncWrapper(getModelResponse))
AIRouter.post('/rd', routeSanity, asyncWrapper(getRd))

export default AIRouter
