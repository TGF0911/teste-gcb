import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createDoctors1607115221948 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'doctors',
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
          name: 'name',
          type: 'varchar',
          length: '120'
        },
        {
          name: 'crm',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'landline',
          type: 'varchar'
        },
        {
          name: 'phone',
          type: 'varchar'
        },
        {
          name: 'cep',
          type: 'varchar',
          length: '9'
        }

      ]

    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors')
  }
}
