import "./DoctorScheduleCard.css"
interface DoctorSchedule {
    id: number;
    startHour: string;
    endHour: string;
    isSelected: boolean;
    day: string;
    doctorId: number;
}
export default function DoctorScheduleCard({data}: {data: DoctorSchedule[]}){
    let content = data.map(schedule => {
        return (
            <li className="doctor-schedule-item" key={schedule.id}>
                {schedule.day} de {schedule.startHour} a {schedule.endHour}
            </li>
        )
    })
    return (
        <ul className="doctor-schedule-items">
            {content}
        </ul>
    )
}