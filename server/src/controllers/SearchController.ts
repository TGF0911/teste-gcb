import { Response, Request } from 'express'
import { getRepository } from 'typeorm'
import { Doctor } from '../models/Doctor'
import api from '../__test__/services/api'

export default {
  async findByName (req : Request, res : Response) {
    const name = req.body

    const doctorRepository = getRepository(Doctor)
    const doctor = await doctorRepository.find({ where: { name: name }, relations: ['specialties'] })

    if (!doctor) return res.status(401).json({ message: 'Not Found' })

    return res.json(doctor)
  },
  async findByCRM (req : Request, res : Response) {
    const { crm } = req.body
    const doctorRepository = getRepository(Doctor)
    const doctor = await doctorRepository.find({ where: { crm: crm }, relations: ['specialties'] })

    if (!doctor) return res.status(401).json({ message: 'Not Found' })

    return res.json(doctor)
  },
  async findCEP (req : Request, res : Response) {
    const { cep } = req.body
    const consultaCEP = `https://viacep.com.br/ws/${cep}/json/`
    const { data } = await api.get(consultaCEP)

    return res.json(data)
  }
}
