import { Response, Request } from 'express'
import { getRepository } from 'typeorm'
import { Doctor } from '../models/Doctor'
import { Specialty } from '../models/Specialty'
import * as Yup from 'yup'
import api from '../services/api'

export default {

  async create (req : Request, res : Response) {
    const { name, crm, cep, phone, landline } = req.body
    const specialty = req.body.specialty as Specialty[]

    const doctorRepository = getRepository(Doctor)

    const doctor = await doctorRepository.findOne({ crm: crm })

    if (doctor) return res.status(401).json({ message: 'This doctor is already registered' })

    const specialties = specialty.map((specialty : Specialty) => {
      return { id: specialty.id }
    })

    const dataDoctor = {
      name,
      crm,
      cep,
      phone,
      landline,
      specialties
    }

    const schema = Yup.object().shape({
      name: Yup.string().required().max(120),
      crm: Yup.string().required(),
      cep: Yup.string().required().max(9),
      phone: Yup.string().required(),
      landline: Yup.string().required(),
      specialties: Yup.array().required().min(2)
    })

    await schema.validate(dataDoctor, { abortEarly: false })

    const doctorData = doctorRepository.create(dataDoctor)
    await doctorRepository.save(doctorData)

    const consultaCEP = `https://viacep.com.br/ws/${cep}/json/`
    const { data } = await api.get(consultaCEP)

    return res.status(201).json({ doctorData, data })
  },

  async index (req : Request, res : Response) {
    const doctorRepository = getRepository(Doctor)

    const doctors = await doctorRepository.find()

    return res.json(doctors)
  },

  async show (req : Request, res : Response) {
    const id = req.params.id

    const doctorRepository = getRepository(Doctor)

    const doctor = await doctorRepository.findOneOrFail(id)
    return res.json(doctor)
  },
  async update (req : Request, res : Response) {
    const crm = req.params.crm
    const doctorRepository = getRepository(Doctor)

    const doctor = await doctorRepository.findOneOrFail(crm)

    if (!doctor) return res.status(401).json({ message: 'Doctor not found' })

    doctorRepository.merge(doctor, req.body)
    const results = await doctorRepository.save(doctor)
    return res.json(results)
  },
  async delete (req : Request, res : Response) {
    const id = req.params.id
    const doctorRepository = getRepository(Doctor)
    const doctor = doctorRepository.findOne(id)

    if (!doctor) return res.status(401).json({ message: 'This doctor not exists' })

    await doctorRepository.softDelete(id)
    return res.json(doctor)
  }
}
