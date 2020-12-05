import {Response, Request} from 'express';
import {getRepository} from 'typeorm';
import Doctor from '../models/Doctor';


export default {

  async create(req : Request, res : Response){
    const {name, crm, cep, phone, landline} = req.body;

    const doctorRepository = getRepository(Doctor);

    const doctor = doctorRepository.findOne({crm: crm});
    
    if(doctor) return res.status(401).json({message: 'This doctor is already registered'});

    const data = {
      name,
      crm,
      cep,
      phone,
      landline
    }

    const doctorData = doctorRepository.create(data);
    await doctorRepository.save(doctorData);

    return res.status(201).json(doctor);
  },

  async index(req : Request, res : Response) {
    const doctorRepository = getRepository(Doctor);

    const doctors = await doctorRepository.find();

    return res.json(doctors);
  },

  async show(req : Request, res : Response){
    const {id} = req.params;

    const doctorRepository = getRepository(Doctor);

    const doctor = await doctorRepository.findOneOrFail(id)
    return res.json(doctor)

  }
}