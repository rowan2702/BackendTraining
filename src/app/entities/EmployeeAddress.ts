import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";
import { Employee } from "./Employee";

@Entity("address")
    export class EmployeeAddress extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: true })
        public line1: string;
        @Column({ nullable: true })
        public line2: string;
        @Column({ nullable: true })
        public city: string;
        @Column({ nullable: true })
        public state: string;
        @Column({ nullable: true })
        public country: string;
        @Column({ nullable: true })
        public pincode: string;
        
}