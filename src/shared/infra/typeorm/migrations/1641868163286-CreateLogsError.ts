import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLogsError1641868163286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'logs_error',
        columns: [
          {
            name: 'cod',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'error',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
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
    await queryRunner.dropTable('logs_error');
  }
}
