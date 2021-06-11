const app = require('express')()
const path = require('path')
const winston = require('winston')

require('dotenv').config()
const inProduction = process.env.ENV === "production"
const port = inProduction ? process.env.PROD_PORT : process.env.DEV_PORT

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
	new winston.transports.File({ filename: 'error.log', level: 'error' }),
	new winston.transports.File({ filename: 'combined.log' })
    ]
})
if (!inProduction) {
    logger.add(new winston.transports.Console({
	format: winston.format.simple()
    }))
}


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})