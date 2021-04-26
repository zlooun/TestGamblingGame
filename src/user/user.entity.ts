import { Entity, BaseEntity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;
	@Column({length: 50, nullable: true})
	name: string;
	@Column({length: 20})
	login: string;
	@Column({length: 128})
	password: string;
	@Column({length: 128})
	salt: string;
  @CreateDateColumn()
  created: Date;
  @UpdateDateColumn()
  modified: Date;
}