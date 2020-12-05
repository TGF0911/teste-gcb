import { Response, Request } from 'express'
import { getRepository } from 'typeorm'
import { Doctor } from '../models/Doctor'
import { Specialty } from '../models/Specialty'
import * as Yup from 'yup'

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

    const data = {
      name,
      crm,
      cep,
      phone,
      landline,
      specialties
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      crm: Yup.string().required(),
      cep: Yup.string().required(),
      phone: Yup.string().required(),
      landline: Yup.string().required()
    })

    await schema.validate(data, { abortEarly: false })

    const doctorData = doctorRepository.create(data)
    await doctorRepository.save(doctorData)

    return res.status(201).json(doctor)
  },

  async index (req : Request, res : Response) {
    const doctorRepository = getRepository(Doctor)

    const doctors = await doctorRepository.find()

    return res.json(doctors)
  },

  async show (req : Request, res : Response) {
    const { id } = req.params

    const doctorRepository = getRepository(Doctor)

    const doctor = await doctorRepository.findOneOrFail(id)
    return res.json(doctor)
  },
  async update (req : Request, res : Response) {
    const { id } = req.params
    const doctorRepository = getRepository(Doctor)

    const doctor = await doctorRepository.findOneOrFail(id)

    if (!doctor) return res.status(401).json({ message: 'Doctor not found' })

    doctorRepository.merge(doctor, req.body)
    const results = await doctorRepository.save(doctor)
    return res.json(results)
  }
}
