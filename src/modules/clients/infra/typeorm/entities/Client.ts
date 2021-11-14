import {
  Entity,
  Column,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('clients')
class Clients {
  @PrimaryColumn()
  cod: string;

  @Column()
  email: string;

  @Column()
  sended: string;

  @UpdateDateColumn()
  created_at: Date;
}

export default Clients;
