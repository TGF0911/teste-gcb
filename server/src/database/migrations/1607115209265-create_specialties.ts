import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSpecialties1607115209265 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name : 'specialties',
            columns : [
              {
                name: 'id',
                type: 'interger',
                unsigned: true,
                isPrimary : true,
                isGenerated : true,
                generationStrategy : 'increment'
              },
              {
                name : 'name',
                type: 'varchar',
              },
              
            ]
    
          }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('specialties')
    }

}
