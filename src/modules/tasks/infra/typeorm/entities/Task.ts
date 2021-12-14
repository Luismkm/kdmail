import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tasks')
class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  description: string;

  @Column()
  status: string;

  @UpdateDateColumn()
  created_at: Date;
}

export default Tasks;
