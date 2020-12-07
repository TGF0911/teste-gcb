import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Doctor } from './Doctor'

@Entity('specialties')
export class Specialty {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Doctor, doctor => doctor.specialties)
  doctors: Doctor[];
}
