import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
@Entity()
export class Component {
    @ObjectIdColumn()
    id: ObjectID

    @Column({ unique: true })
    name: string

    @Column()
    code: string
}
