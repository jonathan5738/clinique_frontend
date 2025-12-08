import { FiTrash } from "react-icons/fi";
import type { Day } from "./DoctorForm"

type ScheduleDay = {
    lundi: Day,
    mardi: Day,
    mercredi: Day,
    jeudi: Day,
    vendredi: Day,
    samedi: Day,
    dimanche: Day
}
type ScheduleForm = ScheduleDay & {
    updateFields: (data: Partial<ScheduleDay>) => void;
}
export default function DoctorScheduleFields({
    lundi, mardi, mercredi, jeudi, 
    vendredi, samedi, dimanche,
    updateFields
}: ScheduleForm){
    return (
        <div className="doctor-form-field-container">
            <h2 className="doctor-form-field-title">Entrer les horaires du médecin</h2>
            <div className="doctor-form-field">
                <label htmlFor="" className="doctor-form-day">{lundi.day}</label>
                <div className="timepicker">
                    <input type="time" value={lundi.startHour} onChange={e => updateFields({lundi: {...lundi, startHour: e.target.value, isSelected: true}})} />
                    <input type="time" value={lundi.endHour} onChange={e => updateFields({lundi: {...lundi, endHour: e.target.value, isSelected: true}})} />
                    {lundi.isSelected && (<button onClick={
                        () => updateFields({lundi: {...lundi, isSelected: false, startHour: "", endHour: ""}})
                    }><FiTrash/></button>)}
                </div>
            </div>

            <div className="doctor-form-field">
                <label htmlFor="" className="doctor-form-day">{mardi.day}</label>
                <div className="timepicker">
                    <input type="time" value={mardi.startHour} onChange={e => updateFields({mardi: {...mardi, startHour: e.target.value, isSelected: true}})} />
                    <input type="time" value={mardi.endHour} onChange={e => updateFields({mardi: {...mardi, endHour: e.target.value, isSelected: true}})} />
                    {mardi.isSelected && (<button onClick={
                        () => updateFields({mardi: {...mardi, isSelected: false, startHour: "", endHour: ""}})
                    }><FiTrash/></button>)}
                </div>
            </div>

            <div className="doctor-form-field">
                <label htmlFor="" className="doctor-form-day">{mercredi.day}</label>
                <div className="timepicker">
                    <input type="time" value={mercredi.startHour} onChange={e => updateFields({mercredi: {...mercredi, startHour: e.target.value, isSelected: true}})} />
                    <input type="time" value={mercredi.endHour} onChange={e => updateFields({mercredi: {...mercredi, endHour: e.target.value, isSelected: true}})} />
                    {mercredi.isSelected && (<button onClick={
                        () => updateFields({mercredi: {...mercredi, isSelected: false, startHour: "", endHour: ""}})
                    }><FiTrash/></button>)}
                </div>
            </div>

            <div className="doctor-form-field">
                <label htmlFor="" className="doctor-form-day">{jeudi.day}</label>
                <div className="timepicker">
                    <input type="time" value={jeudi.startHour} onChange={e => updateFields({jeudi: {...jeudi, startHour: e.target.value, isSelected: true}})} />
                    <input type="time" value={jeudi.endHour} onChange={e => updateFields({jeudi: {...jeudi, endHour: e.target.value, isSelected: true}})} />

                    {jeudi.isSelected && (<button onClick={
                        () => updateFields({jeudi: {...jeudi, isSelected: false, startHour: "", endHour: ""}})
                    }><FiTrash/></button>)}
                </div>
            </div>

            <div className="doctor-form-field">
                <label htmlFor="" className="doctor-form-day">{vendredi.day}</label>
                <div className="timepicker">
                    <input type="time" value={vendredi.startHour} onChange={e => updateFields({vendredi: {...vendredi, startHour: e.target.value, isSelected: true}})} />
                    <input type="time" value={vendredi.endHour} onChange={e => updateFields({vendredi: {...vendredi, endHour: e.target.value, isSelected: true}})} />
                    {vendredi.isSelected && (<button onClick={
                        () => updateFields({vendredi: {...vendredi, isSelected: false, startHour: "", endHour: ""}})
                    }><FiTrash/></button>)}
                </div>
            </div>

            <div className="doctor-form-field">
                <label htmlFor="" className="doctor-form-day">{samedi.day}</label>
                <div className="timepicker">
                    <input type="time" value={samedi.startHour} onChange={e => updateFields({samedi: {...samedi, startHour: e.target.value, isSelected: true}})} />
                    <input type="time" value={samedi.endHour} onChange={e => updateFields({samedi: {...samedi, endHour: e.target.value, isSelected: true}})} />

                    {samedi.isSelected && (<button onClick={
                        () => updateFields({samedi: {...samedi, isSelected: false, startHour: "", endHour: ""}})
                    }><FiTrash/></button>)}
                </div>
            </div>

            <div className="doctor-form-field">
                <label htmlFor="" className="doctor-form-day">{dimanche.day}</label>
                <div className="timepicker">
                    <input type="time" value={dimanche.startHour} onChange={e => updateFields({dimanche: {...dimanche, startHour: e.target.value, isSelected: true}})} />
                    <input type="time" value={dimanche.endHour} onChange={e => updateFields({dimanche: {...dimanche, endHour: e.target.value, isSelected: true}})} />

                    {dimanche.isSelected && (<button onClick={
                        () => updateFields({dimanche: {...dimanche, isSelected: false, startHour: "", endHour: ""}})
                    }><FiTrash/></button>)}
                </div>
            </div>
        </div>
    )
}