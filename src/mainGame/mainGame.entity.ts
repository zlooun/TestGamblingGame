import { Entity, BaseEntity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class MainGame extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;
	@Column('uuid')
	userId: string;
	@Column()
	result: boolean;
	@Column()
	resultValue: number;
	@Column()
	bet: number;
	@Column()
	probability: number;
  @CreateDateColumn()
  created: Date;
  @UpdateDateColumn()
  modified: Date;
}