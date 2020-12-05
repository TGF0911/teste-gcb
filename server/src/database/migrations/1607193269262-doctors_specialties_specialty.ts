import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class doctorsSpecialtiesSpecialty1607193269262 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'doctors_specialty',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'specialty_id',
          type: 'integer'
        },
        {
          name: 'doctor_id',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          name: 'DoctorsToSpecialty',
          columnNames: ['specialty_id'],
          referencedTableName: 'specialties',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE'
        },
        {
          name: 'SpecialtyToDoctor',
          columnNames: ['doctor_id'],
          referencedTableName: 'doctors',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors_specialty')
  }
}
