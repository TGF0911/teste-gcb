import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('specialties')
export default class Specialty {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
