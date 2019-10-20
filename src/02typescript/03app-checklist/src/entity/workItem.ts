import {Column,CreateDateColumn,Entity,PrimaryGeneratedColumn,UpdateDateColumn} from 'typeorm'

@Entity()
export class WorkItem{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        length: 100,
    })
    public text: string;

    @Column({
        default: false,
    })
    public isChecked: boolean;


    @CreateDateColumn({
        type: 'numeric'
    })
    public createAt: Date;

    @UpdateDateColumn({
        type: 'numeric'
    })
    public updateAt: Date;

}