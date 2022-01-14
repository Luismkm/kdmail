import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClients1641867362785 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'cod',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'sended',
            type: 'varchar',
            default: "'N'",
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
