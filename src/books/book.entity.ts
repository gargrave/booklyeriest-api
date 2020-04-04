import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Author } from 'src/authors/author.entity'

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ length: 255 })
  title: string

  @ManyToOne(
    (_type) => Author,
    (author) => author.books,
    { nullable: false },
  )
  author: Author

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
