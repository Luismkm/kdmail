import { Entity, Column, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('logs_error')
class LogsError {
  @PrimaryColumn()
  cod: string;

  @Column()
  error: string;

  @Column()
  email: string;

  @UpdateDateColumn()
  created_at: Date;
}

export default LogsError;
