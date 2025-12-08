import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import "./EventForm.css"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddNewEventMutation, useGetAllDepartmentPublicQuery } from "../../../api";
import { useState } from "react";
import { FiCheck, FiPlus, FiTrash } from "react-icons/fi";

interface Input {
    title: string;
    description: string;
    personInCharge: string;
    schedules: {
        date: string;
        startHour: string;
        endHour: string;
        scheduleId: number;
        eventId: number;
    }[]
}
const eventSchema = z.object({
    title: z.string()
            .min(3, "Veuillez entrer un titre plus long, s’il vous plaît")
            .trim().toLowerCase(),
    description: z.string()
            .min(10, "Veuillez entrer une description plus longue, s’il vous plaît")
            .max(100, "Veuillez entrer une description plus courte, s’il vous plaît")
            .trim(),
    personInCharge: z.string()
            .min(3, "Veuillez entrer un nom plus long, s’il vous plaît")
            .max(30, "Veuillez entrer un nom plus court, s’il vous plaît")
            .trim()
            .toLowerCase(),
    schedules: z.array(z.object({
        date: z.string(),
        startHour: z.string(),
        endHour: z.string(),
        scheduleId: z.number(),
        eventId: z.number()
    }))
});

export default function EventForm(){
    const {data, isSuccess, isFetching, isLoading, isError} = useGetAllDepartmentPublicQuery();
    const [selectedDepartment, setSelectedDepartment] = useState<number>(0);
    const [isDepartmentSelected, setIsDepartmentSelected] = useState<boolean>(true);

    const [addNewEvent] = useAddNewEventMutation();
    const {register, handleSubmit, formState: {errors}, setValue, control} = useForm<Input>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: "",
            description: "",
            personInCharge: "",
            schedules: [{date: "", startHour: "", endHour: "", scheduleId: 0, eventId: 0}]
        }
    });
    const {fields, append, remove} = useFieldArray({name: "schedules", control});
    let options;
    if(isSuccess){
        options = data.map(department => {
            return (
                <option key={department.id} value={department.id}>{department.name}</option>
            )
        })
    }
    const onSubmit: SubmitHandler<Input> = (data) => {
        if(selectedDepartment > 0){
            const formData = {...data, departmentId: selectedDepartment};
            addNewEvent(formData);
            setValue("description", "");
            setValue("title", "");
            setValue("personInCharge", "");
            setValue("schedules", [{date: "", startHour: "", endHour: "", eventId: 0, scheduleId: 0}])
        } else {
            setIsDepartmentSelected(false);
        }
    }
    return (
        <div className="event-form-container">
            <h2>Créer un nouvel événement</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="event-form-fields">
                <div>
                    <label className="event-form-label" htmlFor="title">Titre</label>
                    <input className="event-form-input" id="title" type="text" {...register("title")}/>
                    {errors.title && <span className="event-form-error">{errors.title.message}</span>}
                </div>
                <div>
                    <label className="event-form-label" htmlFor="description">Description</label>
                    <textarea className="event-form-description" id="description" {...register("description")}></textarea>
                    {errors.description && <span className="event-form-error">{errors.description.message}</span>}
                </div>

                <div>
                    <label className="event-form-label" htmlFor="personInCharge">Nom du responsable</label>
                    <input className="event-form-input" type="text" {...register("personInCharge")} />
                    {errors.personInCharge && <span className="event-form-error">{errors.personInCharge.message}</span>}
                </div>

                <div>
                    <label htmlFor="schedule">enter schedule</label>
                    <div>
                        {fields.map((field, index) => {
                            return(
                                <div key={field.id} className="event-schedule-fields">
                                    <div>
                                        <label htmlFor="date" className="event-schedule-label">jour de l'evenement</label>
                                        <input type="date" {...register(`schedules.${index}.date`)} />
                                    </div>
                                    <div>
                                        <label htmlFor="startHour" className="event-schedule-label">Debut de l'evenement</label>
                                        <input type="time" {...register(`schedules.${index}.startHour`)} />
                                    </div>
                                    <div>
                                        <label htmlFor="endHour" className="event-schedule-label">Fin de l'evenement</label>
                                        <input type="time" {...register(`schedules.${index}.endHour`)} />
                                    </div>
                                    {index > 0 && (
                                        <div className="remove-event-schedule-button" onClick={() => remove(index)}>
                                            <FiTrash size={15}/>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                        <button className="add-event-schedule-button" type="button" onClick={() => 
                            append({date: "", startHour: "",
                             endHour: "", scheduleId: 0, eventId: 0})}>
                        <FiPlus size={20}/> Ajouter un evenement</button>

                    </div>
                </div>
                <div>
                    {isFetching || isLoading && (<p>loading...</p>)}
                    { isSuccess && (
                    <div>
                        <label htmlFor="speciality" className="doctor-form-label">Selectionez une special</label>
                        <select className="speciality-field"  id="speciality" onChange={e => {
                            setSelectedDepartment(parseInt(e.target.value))
                            setIsDepartmentSelected(true);
                        }}>
                            <option>Veuillez choisir une specialité</option>
                            {options}
                        </select>
                        {!isDepartmentSelected && (
                            <span className="event-form-error">Veuillez sélectionner une spécialité, s’il vous plaît.</span>
                        )}
                    </div>
                  )}
             </div>
            </div>
                <button className="event-form-button"><FiCheck size={20}/>Sauvegarder</button>
            </form>
        </div>
    )
}