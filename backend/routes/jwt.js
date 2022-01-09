import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserService from '../services/UserService';

let jwtRouter = Router()
let authenticateUser = (req, res, next) => {

	const { token } = req.body;

	if (!token) {
		return res.status(400).json({ 'status': 'Unauthorized: Token missing' })
	} else {
		jwt.verify(token, config['jwtSecretKey'], (err, data) => {
			if (err) {
				return res.status(400).json({ 'status': 'Unauthorized: Token not valid' })
			} else {
				req.username = data.username
				req.password = data.password
				next()
			}
		})
	}
}


jwtRouter.get('/', async (req, res) => {
	await UserService.selectAll()
		.then(users => res.status(200).json(users))
		.catch(err => res.status(400).json({ 'status': 'Error finding users' }))
})

jwtRouter.post('/create-user', async (req, res) => {

	const user = await UserService.selectByUsername(req.body)

	if (user) {
		return res.status(400).json({ 'status': 'user already exists!' })
	}

	UserService.createUser(req.body)
		.then(user => res.status(200).json({ "status": "user added!" }))
})

jwtRouter.delete('/delete-user', async (req, res) => {
	await UserService.deleteUser(req.body)
		.then(user => res.status(200).json(user))
})

jwtRouter.put('/update-user', async (req, res) => {
	await UserService.updateUser(req.body)
		.then(message => {
			res.json(message)
		}).catch(err => res.json(err))
})

jwtRouter.post('/login', async (req, res) => {
	await UserService.validateUser(req.body)
		.then(user => {
			if (user) {
				const { id } = user
				const token = jwt.sign({ id }, config['jwtSecretKey'], {
					expiresIn: '1h'
				})

				res.cookie('token', token, { sameSite: 'none', secure: true })

				return res.status(200).json({ 'status': 'success' })
			}

			return res.status(400).json({ 'status': 'user not found!' })
		})
})

jwtRouter.post('/user', authenticateUser, async (req, res) => {
	const token = jwt.decode(req.body['token'])
	const { id } = token;

	await UserService.selectById(id)
		.then(user => res.status(200).json({ ...user }))
		.catch(err => res.status(400).json({ 'status': 'invalid format' }))
})

export default jwtRouter;
