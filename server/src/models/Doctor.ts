import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import Specialty from './Specialty';

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

  @ManyToMany(() => Specialty, specialty => specialty.doctors)
  specialtys: Specialty[];

}