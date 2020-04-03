import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Book } from 'src/books/book.entity'

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ length: 255 })
  firstName: string

  @Column({ length: 255 })
  lastName: string

  @OneToMany(
    type => Book,
    book => book.author,
  )
  books: Book[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
