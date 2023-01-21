'use strict'

import path from 'path'

const ROOT_DIR = process.mainModule ? path.parse(process.mainModule.filename).dir : global.rootDir

const DIR_CONFIG = {
  ROOT_DIR
}

export default DIR_CONFIG
