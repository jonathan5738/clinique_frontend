import { useEffect, useState, type FormEvent } from "react";
import { useGetAllSchedulesQuery, useGetOneDoctorQuery, useUpdateDoctorMutation } from "../../../api";
import type { Schedule } from "../../../types";
import { useMultistepForm } from "./useMultistepForm";
import DoctorPersonFields from "./DoctorPersonFields";
import DoctorEditScheduleFields from "./DoctorEditScheduleFields";
import { errorNotification, personalInfoSchema } from "../../../utils";
import { ToastContainer } from "react-toastify";
import "./DoctorForm.css";
import { FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface DoctorType {
    firstName: string;
    middleName: string;
    lastName: string;
    departmentId: number,
    departmentName: string;
    lundi: Schedule;
    mardi: Schedule;
    mercredi: Schedule;
    jeudi: Schedule;
    vendredi: Schedule;
    samedi: Schedule;
    dimanche: Schedule;
}
const initialData: DoctorType = {
    firstName: "",
    lastName: "",
    departmentId: 0,
    middleName: "",
    departmentName: "",
    lundi: {doctorId: 0, id: 0, dayNumber: 1, day: "lundi", startHour: "", endHour: "", isSelected: false},
    mardi: {doctorId: 0, id: 0, dayNumber: 2, day: "mardi", startHour: "", endHour: "", isSelected: false},
    mercredi: {doctorId: 0, id: 0, dayNumber: 3, day: "mercredi", startHour: "", endHour: "", isSelected: false},
    jeudi: {doctorId: 0, id: 0, dayNumber: 4, day: "jeudi", startHour: "", endHour: "", isSelected: false},
    vendredi: {doctorId: 0, id: 0, dayNumber: 5, day: "vendredi", startHour: "", endHour: "", isSelected: false},
    samedi: {doctorId: 0, id: 0, dayNumber: 6, day: "samedi", startHour: "", endHour: "", isSelected: false},
    dimanche: {doctorId: 0, id: 0, dayNumber: 7, day: "dimanche", startHour: "", endHour: "", isSelected: false}
}
export default function DoctorEditForm({doctorId, departmentName}: {doctorId: number, departmentName: string;}){
    
    const {data, isLoading, isSuccess} = useGetOneDoctorQuery(doctorId);
    const {data: schedules, isSuccess: isSuccessSchedules} =useGetAllSchedulesQuery(doctorId.toString());
    const [updateDoctor] = useUpdateDoctorMutation();
    const [formData, setFormData] = useState<DoctorType>(initialData);

    const updateFields = (input: Partial<DoctorType>) => {
        setFormData({...formData, ...input})
    }
    useEffect(() => {
        if(isSuccess && isSuccessSchedules){
            setFormData({...formData, 
                firstName: data.firstName,
                lastName: data.lastName,
                departmentId: data.departmentId,
                departmentName: departmentName,
                middleName: data.middleName,
                lundi: schedules.entities["lundi"],
                mardi: schedules.entities["mardi"],
                mercredi: schedules.entities["mercredi"],
                jeudi: schedules.entities["jeudi"],
                vendredi: schedules.entities["vendredi"],
                samedi: schedules.entities["samedi"],
                dimanche: schedules.entities["dimanche"]
            });
        }
    }, [isSuccess]);
    const {currentStepIndex, next, back, steps, step, isFirstStep, isLastStep} = useMultistepForm([
        <DoctorPersonFields {...formData} updateFields={updateFields}/>,
        <DoctorEditScheduleFields {...formData} updateFields={updateFields}/>
    ]);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isLastStep){
            const {lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche} = formData;
            const isDateChosen = lundi.isSelected || mardi.isSelected 
            || mercredi.isSelected || jeudi.isSelected 
            || vendredi.isSelected || samedi.isSelected || dimanche.isSelected;

           const result = personalInfoSchema.safeParse({firstName: formData.firstName,
             lastName: formData.lastName, middleName: formData.middleName});
            if(result.error){
                errorNotification("veuillez enter un prenom et nom de famille");
            }
           if(isDateChosen){
                if(result.success && formData.departmentId > 0){
                    const {lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche} = formData;
                    const days = [lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche].map(item => {
                        return {
                            scheduleId: item.id,
                            startHour: item.startHour!,
                            endHour: item.endHour!,
                            day: item.day,
                            dayNumber: item.dayNumber,
                            isSelected: item.isSelected
                        }
                    });
                    const doctorData = {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        departmentId: formData.departmentId,
                        middleName: formData.middleName,
                        schedules: days
                    }
                    updateDoctor({id: data?.id!, data: doctorData})
                }
           } else {
               console.log("something went wrong")
               errorNotification("Veuillez choisir un créneau horaire pour ce médecin.");
           }
        }
        next();
    }
    return (
        <div>
            <ToastContainer/>
            <div className="doctor-edit-form">
                {isLoading && <p>loading...</p>}
                {isSuccess && isSuccessSchedules && 
                    <>
                    <h3>Modifier les informations du médecin</h3>
                    <form action="" onSubmit={handleSubmit}>
                        <div>{currentStepIndex + 1} / {steps.length}</div>
                        {step}
                        <div className="doctor-form-buttons">
                            {!isFirstStep && <button className="doctor-form-button" type="button" onClick={back}><FiChevronLeft size={20}/> Retour</button>}
                            <button className="doctor-form-button">{isLastStep ? <FiCheck size={20}/> : <FiChevronRight size={20}/>} {isLastStep ? "Confirmer": "Suivant"}</button>
                        </div>
                    </form>
                    </>
                }
            </div>
        </div>
    )
}