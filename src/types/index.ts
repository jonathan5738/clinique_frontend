/**
 * import {z} from "zod";
 * const UserSchame = z.object({
        username: z.string().min(4).max(50),
        age: z.number(),
        birthday: z.date(),
        firstName: z.string(),
        lastName: z.string(),
        middleName: z.string().optional()
 * });
   type User = z.infer<typeof UserSchema>;

   const user = {
     username : "jonthan098",
     age: 24,
     birthday: "2000-10-27",
     firstName: "jonathan",
     middleName: "junior",
     lastName: "nakahonda"
   };

   console.log(UserSchema.safeParse(user).success)
 */

import type { store } from "../store";

export interface DoctorScheduleDTO {
   scheduleId? : number;
   startHour?: string;
   endHour?: string;
   day: string;
   dayNumber: number;
   isSelected: boolean;
}

export interface DoctorDTO {
   firstName: string;
   lastName: string;
   middleName?: string;
   departmentId: number;
   
   schedules: DoctorScheduleDTO[];
}

export interface DepartmentDTO {
   name: string;
}

export interface Schedule {
  id: number;
  startHour?: string;
  endHour?: string;
  day: string;
  dayNumber: number;
  doctorId: number;
  isSelected: boolean;
}
export interface Day {
    dayNumber: number;
    day: string;
    startHour: string;
    endHour: string;
    isSelected: boolean;
}
export interface Doctor {
   id: number;
   firstName: string;
   middleName: string;
   lastName: string;
   departmentId: number;
   schedules: Schedule[];
}
export interface Department {
  id: number;
  name: string;
  doctors: Doctor[];
}

export interface DoctorPersonalFields{
  firstName: string;
  lastName: string;
  middleName?: string;
}

export interface CheckBoxField {
  startHour?: string;
  endHour?: string;
  day: string;
  dayNumber: number;
  isSelected: boolean;
}
export interface BlogPost {
    id: number;
    content: string;
    excerptTitle: string;
    excerptBody: string;
    department: {name: string;},
    author: string; 
    departmentId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  personInCharge: string;
  schedules: {
     id: number;
     date: string;
     startHour: string;
     endHour: string;
     eventId: number;
  }[]
}
export interface EventPagination {
   data: Event[];
   totalPage: number;
   hasNext: boolean;
   hasPrev: boolean;
}
export type BlogPostDTO = Pick<BlogPost, "content" | "excerptBody" | "excerptTitle" | "author" | "departmentId">

export interface BlogPostPagination {
  data: BlogPost[];
  totalPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;