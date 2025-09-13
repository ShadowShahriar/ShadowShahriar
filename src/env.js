import { configDotenv } from 'dotenv'
const prod = process.env['PRODUCTION']
if (!prod) configDotenv({ quiet: true })
export default () => console.log(`✅ Running in ${prod ? 'PRODUCTION' : 'DEVELOPMENT'} environment`)
