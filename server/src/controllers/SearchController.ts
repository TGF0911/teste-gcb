import { Response, Request } from 'express'
import { getRepository } from 'typeorm'
import { Doctor } from '../models/Doctor'
import api from '../__test__/services/api'

const doctorRepository = getRepository(Doctor)

export default {
  async findByName (req : Request, res : Response) {
    const selected = req.body

    const doctor = await doctorRepository.find({ where: { name: selected }, relations: ['specialties'] })

    if (!doctor) return res.status(401).json({ message: 'Not Found' })

    return res.json(doctor)
  },
  async findCRM (req : Request, res : Response) {
    const { selected } = req.query
    const doctor = await doctorRepository.find({ where: { crm: selected }, relations: ['specialties'] })

    if (!doctor) return res.status(401).json({ message: 'Not Found' })

    return res.json(doctor)
  },
  async findCEP (req : Request, res : Response) {
    const { selected } = req.query
    const doctor = await doctorRepository.find({ where: { cep: selected }, relations: ['specialties'] })
    if (!doctor) return res.status(401).json({ message: 'Not Found' })

    const consultaCEP = `https://viacep.com.br/ws/${selected}/json/`
    const { data } = await api.get(consultaCEP)

    return res.json({ doctor, data })
  },

  async findSpecialty (req : Request, res : Response) {
    const { selected } = req.query
    const doctor = await doctorRepository.find({ where: { specialties: selected }, relations: ['specialties'] })
    if (!doctor) return res.status(401).json({ message: 'Not Found' })
    return res.json(doctor)
  },

  async findLandline (req : Request, res : Response) {
    const { selected } = req.query
    const doctor = await doctorRepository.find({ where: { landline: selected }, relations: ['specialties'] })
    if (!doctor) return res.status(401).json({ message: 'Not Found' })
    return res.json(doctor)
  },

  async findPhone (req : Request, res : Response) {
    const { selected } = req.query
    const doctor = await doctorRepository.find({ where: { phone: selected }, relations: ['specialties'] })
    if (!doctor) return res.status(401).json({ message: 'Not Found' })
    return res.json(doctor)
  },

  async findAdress (req : Request, res : Response) {
    const { uf, logradouro, cidade } = req.query
    const consultaCEP = `viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`
    const { data } = await api.get(consultaCEP)
    const doctor = await doctorRepository.find({ where: { cep: data.cep }, relations: ['specialties'] })
    if (!doctor) return res.status(401).json({ message: 'Not Found' })
    return res.json(doctor)
  }

}
