import { Router } from 'express'
import DoctorController from './controllers/DoctorController'
import SpecialtyController from './controllers/SpecialtyController'

const routes = Router()

routes.post('/doctors', DoctorController.create)
routes.get('/doctors', DoctorController.index)
routes.get('/doctors/:id', DoctorController.show)
routes.put('/doctor/:crm', DoctorController.update)
routes.delete('/doctor/:id', DoctorController.delete)

routes.post('/specialty', SpecialtyController.create)

export default routes
