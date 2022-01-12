import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUnsubscribe1641868741472 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'unsubscribes',
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
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('unsubscribes');
  }
}
