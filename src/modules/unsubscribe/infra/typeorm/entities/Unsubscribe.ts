import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('unsubscribes')
class Unsubscribe {
  @PrimaryColumn()
  cod: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Unsubscribe;
