import { Router } from 'express'
import DoctorController from './controllers/DoctorController'

const routes = Router()

routes.post('/doctors', DoctorController.create)
routes.get('/doctors', DoctorController.index)
routes.get('/doctors', DoctorController.show)

export default routes
