import { Response, Request } from 'express'
import { getRepository } from 'typeorm'
import { Doctor } from '../models/Doctor'
import api from '../__test__/services/api'

const doctorRepository = getRepository(Doctor)

export default {
  async findByName (req : Request, res : Response) {
    const { name } = req.body

    const doctor = await doctorRepository.find({ where: { name: name }, relations: ['specialties'] })

    if (!doctor) return res.status(401).json({ message: 'Not Found' })

    return res.json(doctor)
  },
  async findCRM (req : Request, res : Response) {
    const { crm } = req.query
    const doctor = await doctorRepository.find({ where: { crm: crm }, relations: ['specialties'] })

    if (!doctor) return res.status(401).json({ message: 'Not Found' })

    return res.json(doctor)
  },
  async findCEP (req : Request, res : Response) {
    const { cep } = req.query
    const doctor = await doctorRepository.find({ where: { cep: cep }, relations: ['specialties'] })
    if (!doctor) return res.status(401).json({ message: 'Not Found' })

    const consultaCEP = `https://viacep.com.br/ws/${cep}/json/`
    const { data } = await api.get(consultaCEP)

    return res.json({ doctor, data })
  },

  async findSpecialty (req : Request, res : Response) {
    const { specialty } = req.query
    const doctor = await doctorRepository.find({ where: { specialties: specialty }, relations: ['specialties'] })
    if (!doctor) return res.status(401).json({ message: 'Not Found' })
    return res.json(doctor)
  },

  async findLandline (req : Request, res : Response) {
    const { landline } = req.query
    const doctor = await doctorRepository.find({ where: { landline: landline }, relations: ['specialties'] })
    if (!doctor) return res.status(401).json({ message: 'Not Found' })
    return res.json(doctor)
  },

  async findPhone (req : Request, res : Response) {
    const { phone } = req.query
    const doctor = await doctorRepository.find({ where: { phone: phone }, relations: ['specialties'] })
    if (!doctor) return res.status(401).json({ message: 'Not Found' })
    return res.json(doctor)
  }

}
