import { Router } from 'express'
import DoctorController from './controllers/DoctorController'
import SearchController from './controllers/SearchController'
import SpecialtyController from './controllers/SpecialtyController'

const routes = Router()

routes.post('/doctors', DoctorController.create)
routes.get('/doctors', DoctorController.index)
routes.get('/doctors/:id', DoctorController.show)
routes.put('/doctor/:crm', DoctorController.update)
routes.delete('/doctor/:id', DoctorController.delete)

routes.get('/doctor/name', SearchController.findByName)
routes.get('/doctor/cep', SearchController.findCEP)
routes.get('/doctor/crm', SearchController.findCRM)
routes.get('/doctor/landline', SearchController.findLandline)
routes.get('/doctor/phone', SearchController.findPhone)
routes.get('/doctor/adress', SearchController.findAdress)

routes.post('/specialty', SpecialtyController.create)
routes.get('/specialty', SpecialtyController.index)
export default routes
