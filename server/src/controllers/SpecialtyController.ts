import { Response, Request } from 'express'
import { getRepository } from 'typeorm'
import Specialty from '../models/Specialty'

export default {
  async create (req : Request, res : Response) {
    const specialtyRepository = getRepository(Specialty)

    const data = specialtyRepository.create(req.body)
    const specialtyData = await specialtyRepository.save(data)

    return res.json(specialtyData)
  }
}
