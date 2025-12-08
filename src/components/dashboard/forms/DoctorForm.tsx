import { useState, type FormEvent} from "react";
import { useMultistepForm } from "./useMultistepForm";
import DoctorPersonFields from "./DoctorPersonFields";
import DoctorScheduleFields from "./DoctorScheduleFields";
import { ToastContainer } from "react-toastify";
import { errorNotification, personalInfoSchema } from "../../../utils";
import { FiChevronLeft, FiChevronRight, FiCheck } from "react-icons/fi";
import "./DoctorForm.css";
import { useAddNewDoctorMutation } from "../../../api";

export interface Day {
    dayNumber: number;
    day: string;
    startHour: string;
    endHour: string;
    isSelected: boolean;
}
interface DoctorType {
    firstName: string;
    middleName: string;
    lastName: string;
    departmentId: number;
    departmentName: string;
    lundi: Day;
    mardi: Day;
    mercredi: Day;
    jeudi: Day;
    vendredi: Day;
    samedi: Day;
    dimanche: Day;
}
const initialData: DoctorType = {
    firstName: "",
    lastName: "",
    middleName: "",
    departmentName: "",
    departmentId: 0,
    lundi: {dayNumber: 1, day: "lundi", startHour: "", endHour: "", isSelected: false},
    mardi: {dayNumber: 2, day: "mardi", startHour: "", endHour: "", isSelected: false},
    mercredi: {dayNumber: 3, day: "mercredi", startHour: "", endHour: "", isSelected: false},
    jeudi: {dayNumber: 4, day: "jeudi", startHour: "", endHour: "", isSelected: false},
    vendredi: {dayNumber: 5, day: "vendredi", startHour: "", endHour: "", isSelected: false},
    samedi: {dayNumber: 6, day: "samedi", startHour: "", endHour: "", isSelected: false},
    dimanche: {dayNumber: 7, day: "dimanche", startHour: "", endHour: "", isSelected: false}
}

export default function DoctorForm() {
    const [data, setData] = useState<DoctorType>(initialData);
    const updateFields = (input: Partial<DoctorType>) => {
        setData({...data, ...input})
    }
    const {currentStepIndex, steps, next, back, isFirstStep, isLastStep, step} = useMultistepForm([
        <DoctorPersonFields {...data} updateFields={updateFields}/>,
        <DoctorScheduleFields {...data} updateFields={updateFields}/>
    ]);
    
    const [addNewDoctor] = useAddNewDoctorMutation();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isLastStep){
            const {lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche} = data;
            const isDateChosen = lundi.isSelected || mardi.isSelected 
            || mercredi.isSelected || jeudi.isSelected 
            || vendredi.isSelected || samedi.isSelected || dimanche.isSelected;

           const result = personalInfoSchema.safeParse({firstName: data.firstName,
             lastName: data.lastName, middleName: data.middleName});
            if(result.error){
                errorNotification("veuillez enter un prenom et nom de famille");
            }
           if(isDateChosen){
               if(result.success && data.departmentId > 0){
                  const {lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche} = data;
                  const doctorData = {
                    firstName: data.firstName,
                    middleName: data.middleName,
                    lastName: data.lastName,
                    departmentId: data.departmentId,
                    schedules: [lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche]
                  }
                  addNewDoctor(doctorData);
               } 
           } else {
               errorNotification("select a schedule time for this doctor");
           }
        }
        next();
    }
    return (
        <div className="doctor-creation-form">
            {/*{!dateSelected && (<p>you must select a schedule time for this doctor</p>)}*/}
            <ToastContainer/>
            <form onSubmit={handleSubmit}>
                <div>{currentStepIndex + 1} / {steps.length}</div>
                {step}
                <div className="doctor-form-buttons">
                    {!isFirstStep && <button className="doctor-form-button" type="button" onClick={back}><FiChevronLeft size={20}/> Retour</button>}
                    <button className="doctor-form-button">{isLastStep ? <FiCheck size={20}/> : <FiChevronRight size={20}/>} {isLastStep ? "Confirmer": "Suivant"}</button>
                </div>
            </form>
        </div>
    )
}