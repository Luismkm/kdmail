import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('clients')
class Clients {
  @PrimaryColumn()
  cod: string;

  @Column()
  email: string;

  @Column()
  sended: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Clients;
