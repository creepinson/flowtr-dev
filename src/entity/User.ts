import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { Project } from './Project'

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    fullName: string

    @Column({ unique: true })
    username: string

    @Column()
    role: string

    @Column()
    password: string

    @Column((type) => Project)
    projects: Project[]
}
