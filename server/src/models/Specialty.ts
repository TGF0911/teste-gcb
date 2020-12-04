import {Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany} from 'typeorm'
import Doctor from './Doctor';

@Entity()
export default class Specialty {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Doctor, doctor => doctor.specialtys)
  @JoinTable()
  doctors : Doctor[]

}