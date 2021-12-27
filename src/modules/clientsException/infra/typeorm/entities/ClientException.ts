import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('clients_exception')
class ClientException {
  @PrimaryColumn()
  cod: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;
}

export default ClientException;
