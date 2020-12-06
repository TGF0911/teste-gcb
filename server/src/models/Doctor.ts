import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { Specialty } from './Specialty'

@Entity('doctors')
export class Doctor {
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

  @ManyToMany(specialty => Specialty, {
    cascade: true
  })
  @JoinTable({ name: 'doctors_specialties_specialty', joinColumn: { name: 'doctor_id' }, inverseJoinColumn: { name: 'specialty_id' } })
  specialties : Specialty[]
}
