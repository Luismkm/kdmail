import { Entity, Column, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('clients_exception')
class ClientException {
  @PrimaryColumn()
  cod: string;

  @Column()
  email: string;

  @UpdateDateColumn()
  created_at: Date;
}

export default ClientException;
