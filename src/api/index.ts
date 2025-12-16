import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { type DoctorDTO, type Department, type DepartmentDTO, type Doctor, type Schedule, type BlogPost, type BlogPostPagination, type EventPagination, type BlogPostExcerptPagination, type BlogPostExcerpts } from "../types";
import { createEntityAdapter, type EntityState } from "@reduxjs/toolkit";

const schedulesAdapter = createEntityAdapter({
    selectId: (schedule: Schedule) => schedule.day
});

export interface DoctorUpdateDTO {
    firstName: string;
    lastName: string;
    middleName?: string;
    departmentId: number;
    schedules: {scheduleId: number; startHour: string; endHour: string; day: string; dayNumber: number; isSelected: boolean}[]
}

interface EventData {
    title: string;
    description: string;
    personInCharge: string;
    departmentId: number;
    schedules: {scheduleId: number; date: string;
         startHour: string; endHour: string; eventId: number}[];
}
const initialState = schedulesAdapter.getInitialState();

export interface DepartmentInfo {
    data: { 
       id: number;
       name: string;
       doctors: {
        id: number; firstName: string;
        lastName: string; middleName: string;
        departmentId: number;
     }[]
    }[],
    totalPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export interface DoctorPagination {
    data: {
        id: number;
        firstName: string;
        middleName?: string;
        lastName: string;
        departmentId: number;
        department: string;
    }[];
    totalPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export interface DoctorInfo {
    id: number;
        firstName: string;
        lastName: string;
        departmentId: number;
        schedules: {
            id: number;
            startHour: string;
            endHour: string;
            day: string;
            doctorId: number;
            isSelected: boolean;
        }[]
}
export interface DepartmentPublicInfo {
    id: number;
    name: string;
    doctors: DoctorInfo[]
}
const url = "https://whatever-app-azurelernen-dev-001-cje7gbfkcyf3gdhn.spaincentral-01.azurewebsites.net/api";
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: url}),
    tagTypes: ["Department", "Doctor", "Event"],
    endpoints: builder => ({
        getAllDepartment: builder.query<Department[], void>({
            query: () => "/Department",
            providesTags: (result=[], _error, _arg) => [
                {type: "Department", id: "LIST"}, 
                ...result.map(el => ({type: "Department", id: el.id}) as const)
            ]
        }),
        getAllDepartmentInfo: builder.query<DepartmentInfo, number>({
            query: (page) => {
                const p = page ?? 1;
                return `/Department/all?page=${p <= 0 ? 1 : p}`;
            },
            providesTags: (results, _args, _error) => [
                {type: "Department", id: "LIST"},
                ...((results?.data ?? []).map(el => ({type: "Department", id: el.id}) as const))
            ] 
        }),
        getAllDoctorInfo: builder.query<DoctorPagination, number>({
            query: (page) => {
                const p = page ?? 1;
                return `/Doctor/all?page=${p <= 0 ? 1 : p}`;
            },
            providesTags: (results, _args, _error) => [
                {type: "Doctor", id: "LIST"},
                ...((results?.data ?? []).map(el => ({type: "Doctor", id: el.id}) as const))
            ] 
        }),
        getAllDepartmentPublic: builder.query<DepartmentPublicInfo[], void>({
            query: () => "/Department",
            providesTags: (results = [], _args, _errors) => [
                {type: "Department", id: "LIST"},
                ...results.map(element => ({type: "Department", id: element.id}) as const)
            ]
        }),
        getDepartment: builder.query<Department, string>({
            query: (id) => `/Department/${id}`,
            providesTags: (_result, _error, arg) => [{type: "Department", id: arg}]
        }),
        createDepartment: builder.mutation<void, {name: string}>({
            query: (data) => ({
                url: "/Department", method: "POST", body: data
            }),
            invalidatesTags: (_result, _error, _arg) => {
                return [{type: "Department", id: "LIST"}]
            }
        }),
        updateDepartment: builder.mutation<void, {id: string, body: DepartmentDTO}>({
            query: (data) => ({
                url: `/Department/${data.id}`, method: "PUT", body: data.body
            }),
            invalidatesTags: (_result,_error, arg) => {
                return [{type: "Department", id: arg.id}]
            }
        }),
        deleteDepartment: builder.mutation<void, string>({
            query: (id) => ({url: `/Department/${id}`, method: "DELETE"}),
            invalidatesTags: (_result, _error, _arg) => [{type: "Department", id: "LIST"}]
        }),


        getOneDoctor: builder.query<Doctor, number>({
            query: (id) => `/Doctor/${id}`,
            providesTags: (_result, _error, arg: number) => [{ type: "Doctor", id: arg }]
        }),
        getAllDoctor: builder.query<Doctor[], void>({
            query: () => "/Doctor",
            providesTags: (result = [], _error, _arg) => [
                {type: "Doctor", id: "LIST"},
                ...result.map(d => ({type: "Doctor", id: d.id}) as const)
            ]
        }),
        addNewDoctor: builder.mutation<void, DoctorDTO>({
            query: (data) => ({url: "/Doctor", method:"POST", body: data}),
            invalidatesTags: (_result, _error, _arg) => [{type: "Doctor", id: "LIST"}, {type: "Department", id: "LIST"}]
        }),
        updateDoctor: builder.mutation<void, {id: number; data: DoctorUpdateDTO}>({
            query: (data) => ({url: `/Doctor/${data.id}`, method: "PUT", body: data.data}),
            invalidatesTags: (_result, _error, arg) => [{type: "Doctor", id: arg.id}, {type: "Department", id: "LIST"}]
        }),
        updateDoctorDepartment: builder.mutation<void, {doctorId: number, departmentId: number}>({
            query: (params) => ({url: `/Doctor/${params.doctorId}/Department/update/${params.departmentId}`, method: "PATCH"}),
            invalidatesTags: (_result, _error, arg) => [{type: "Department", id: arg.departmentId}]
        }),
        getAllSchedules: builder.query<EntityState<Schedule, string>, string>({
            query: (doctorId) => `/Schedule/${doctorId}`,
            transformResponse(response: Schedule[]){
                return schedulesAdapter.setAll(initialState, response);
            },
            providesTags: (_result, _error, arg) => [{type: "Doctor", id: arg}]
        }),
        addNewEvent: builder.mutation<void, EventData>({
            query: (data) => ({url: `/Event`, method: "POST", body: data}),
            invalidatesTags: (_result, _error, _arg) => [{type: "Event", id: "LIST"}]
        }),
        deleteEvent: builder.mutation<void, number>({
            query: (eventId) => ({url: `/Event/${eventId}`, method: "DELETE"}),
            invalidatesTags: (_result, _error, _arg) => [{type: "Event", id: "LIST"}]
        }),

        addNewBlogPost: builder.mutation<void, FormData>({
            query: (data) => ({url: "/BlogPost", method: "POST", body: data})
        }),
        getBlogPostByDepartment: builder.query<BlogPostExcerpts[], void>({
            query: () => "/Department/posts"
        }),
        getOneBlogPost: builder.query<BlogPost, string>({
            query: (blogId) => `/BlogPost/${blogId}`
        }),
        getAllBlogPost: builder.query<BlogPostPagination, number>({
            query: (page) => `/BlogPost?page=${page}`
        }),
        getAllOrderedBlogPost: builder.query<{
            id: number;
            departmentName: string;
            excerptTitle: string;
            excerptBody: string;
            excerptImage: string;
            author: string;
        }[], void>({
            query: () => "/BlogPost/Posts/Ordered"
        }),
        getFeaturedBlogPost: builder.query<BlogPostExcerptPagination, number>({
            query: (page) => `/BlogPost/FeaturedPosts?page=${page}`
        }),
        getAllEvents: builder.query<EventPagination, number>({
            query: (page) => `/Event?page=${page}`,
            providesTags: (_result, _error, _arg) => [{type: "Event", id: "LIST"}]
        }),
        addNewMessage: builder.mutation<void, {firstName:string; lastName: string; title: string; content: string; phoneNumber:string; emailAddress: string}>({
            query: (data) => ({url: "/ContactMessage", method: "POST", body: data})
        })     
    })
})

export const {
    useGetAllDoctorQuery, 
    useGetOneDoctorQuery, 
    useGetAllDepartmentQuery,
    useGetDepartmentQuery,
    useGetAllDepartmentInfoQuery,
    useCreateDepartmentMutation,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
    useGetAllBlogPostQuery,
    useGetAllEventsQuery,
    useGetAllOrderedBlogPostQuery,
    useGetAllDepartmentPublicQuery,
    useGetAllDoctorInfoQuery,
    useGetFeaturedBlogPostQuery,
    useDeleteEventMutation,
    useGetBlogPostByDepartmentQuery,

    useAddNewDoctorMutation,
    useGetAllSchedulesQuery,
    useUpdateDoctorMutation,
    useUpdateDoctorDepartmentMutation,
    useAddNewMessageMutation,

    useAddNewEventMutation,
    useAddNewBlogPostMutation,
    useGetOneBlogPostQuery
} = apiSlice
