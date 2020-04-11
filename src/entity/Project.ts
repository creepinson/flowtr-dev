import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { Component } from './Component'
@Entity()
export class Project {
    @ObjectIdColumn()
    id: ObjectID

    @Column({ unique: true })
    name: string

    @Column(type => Component)
    components: Component[]
}
