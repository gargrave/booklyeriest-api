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
  id: string

  @Column({ length: 255, nullable: false })
  firstName: string

  @Column({ length: 255, nullable: false })
  lastName: string

  @OneToMany(
    (type) => Book,
    (book) => book.author,
  )
  books: Book[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
