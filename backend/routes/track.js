import { Router } from 'express';
import axios from 'axios';

const url = 'https://bps.bringer.dev/public/api/v2/get/parcel/tracking.json'
const trackRouter = Router()

trackRouter.post('/', (req, res) => {
	const { trackingNumber } = req.body

	if (trackingNumber === '') {
		return res.json({ 'status': 'error' })
	}


	axios.get(url + "?tracking_number=" + trackingNumber)
		.then(axiosRes => res.json(axiosRes.data))
		.catch(err => res.json({ 'status': 'error' }))

})

export default trackRouter;