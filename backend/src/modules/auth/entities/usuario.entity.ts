import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ unique: true, length: 10 })
  cedula: string;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  @Column({ unique: true, length: 150 })
  correo: string;

  @Column({ name: 'password', length: 255 })
  password: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'ESTUDIANTE',
  })
  rol: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  estado: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fecha_creacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fecha_actualizacion: Date;
}