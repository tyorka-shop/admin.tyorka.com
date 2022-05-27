import { Schema } from '../../types'
import { LoggerService } from '../../services/LoggerService'
export type Migrator = (data: Schema, logger: LoggerService) => Promise<Schema>