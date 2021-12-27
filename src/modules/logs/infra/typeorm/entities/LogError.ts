import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('logs_error')
class LogsError {
  @PrimaryColumn()
  cod: string;

  @Column()
  error: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;
}

export default LogsError;
