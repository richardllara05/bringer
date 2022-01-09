import { Router } from 'express';
import jwtRouter from './jwt';
import trackRouter from './track';

let router = Router()
router.use('/jwt', jwtRouter)
router.use('/track', trackRouter)

export default router;