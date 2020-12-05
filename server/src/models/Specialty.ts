import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('specialties')
export class Specialty {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
