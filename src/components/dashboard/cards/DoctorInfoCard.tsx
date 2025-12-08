import { FiUser, FiEdit } from "react-icons/fi";
import "./DoctorInfoCard.css"
interface DoctorData {
    id: number;
    firstName: string;
    middleName?: string | undefined;
    lastName: string;
    department: string;
    departmentId: number;
    handleEditForm: (doctorId: number, departmentName: string) => void;
}
export default function DoctorInfoCard(doctor: DoctorData){
    return (
        <div key={doctor.id} className="doctor-info-card-container">
            <div className="doctor-info-card-text">
                <div className="doctor-info-card-icon"><FiUser size={20} stroke="#fff"/></div>
                <div>
                   <h3>{`${doctor.firstName} ${doctor.middleName} ${doctor.lastName}`.toUpperCase()}</h3>
                   <p>{doctor.department}</p>
                </div>
            </div>
            <div>
                <button  className="doctor-info-card-button" onClick={() => {
                    doctor.handleEditForm(doctor.id, doctor.department)
                  }
                }><FiEdit/> Modifier</button>
            </div>
        </div>
    )
}