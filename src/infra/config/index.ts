import * as dotenv from 'dotenv'

import { app } from './app'
import { database } from './database'

dotenv.config()

export default { app, database }
