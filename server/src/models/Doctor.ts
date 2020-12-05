import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import Specialty from './Specialty'

@Entity('doctors')
export default class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  crm: string;

  @Column()
  landline: string;

  @Column()
  phone: string;

  @Column()
  cep: string;

  @ManyToMany(specialty => Specialty)
  @JoinTable({ name: 'doctors_specialty', joinColumn: { name: 'specialty_id' }, inverseJoinColumn: { name: 'doctor_id' } })
  specialties : Specialty[]
}
