import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes';
import config from './config'
import dns from 'dns';

const PORT = config.app['port']

let logger = (req, res, next) => {
	console.log(`${req.path} -> ${req.method}`)
	next()
}

dns.lookup(process.env.FE_HOSTNAME, (err, ip) => {
	let corsOptions = {
		origin: [`http://${ip}:3000`],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true
	}

	let app = express()
	app.use(cors(corsOptions.origin))
	app.use(logger, cookieParser(), express.json(), router)

	app.listen(PORT, () => {
		console.log(`Started on port ${PORT}`)
		console.log(`${corsOptions.origin}`)
		console.log(`${process.env.FE_HOSTNAME}`)
	})
})
