import { useGetAllDepartmentPublicQuery } from "../../../api";

type DoctorPersonalInfo = {
    firstName: string;
    middleName: string;
    lastName: string;
    departmentId: number;
    departmentName: string;
}
type DoctorPersonalInfoForm = DoctorPersonalInfo & {
    updateFields: (data: Partial<DoctorPersonalInfo>) => void;
}
export default function DoctorPersonFields({firstName, lastName, middleName, departmentId, departmentName, updateFields}: DoctorPersonalInfoForm){
    const {data, isSuccess, isFetching, isLoading} = useGetAllDepartmentPublicQuery();
    let options;
    if(isSuccess){
        options = data.map(department => {
            return (
                <option key={department.id} value={department.id}>{department.name}</option>
            )
        })
    }
    return (
    <div className="doctor-form-field-container">
            <h2 className="doctor-form-field-title">Entrer information personnel du medecin</h2>
            <div className="doctor-form-field">
                <label className="doctor-form-label" htmlFor="firstName">Prénom</label>
                <input className="doctor-personal-info" type="text" value={firstName} onChange={e => updateFields({firstName: e.target.value})} />
            </div>
            <div className="doctor-form-field">
                <label className="doctor-form-label" htmlFor="middleName">Second prénom</label>
                <input className="doctor-personal-info" type="text" value={middleName} onChange={e => updateFields({middleName: e.target.value})} />
            </div>
            <div className="doctor-form-field">
                <label className="doctor-form-label" htmlFor="lastName">Nom de famille</label>
                <input className="doctor-personal-info" type="text" value={lastName} onChange={e => updateFields({lastName: e.target.value})} />
            </div>

            <div>
                {isFetching || isLoading && (<p>loading...</p>)}
                { isSuccess && (
                <div>
                    <label htmlFor="" className="doctor-form-label">Selectionez une spécialité</label>
                    <select className="speciality-field" name="" id="" onChange={e => updateFields({departmentId: parseInt(e.target.value)})}>
                        <option value={`${departmentId ? departmentId: ""}`}>{`${departmentId ? departmentName :"Veuillez choisir une specialité"}`}</option>
                        {options}
                    </select>
                </div>
            )}
            </div>
        </div>
    )
}