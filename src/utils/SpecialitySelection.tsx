import { useGetAllDepartmentPublicQuery } from "../api";

interface SpecialitySelectionProps {
    setSelectedDepartment: (value: React.SetStateAction<number>) => void;
    setIsDepartmentSelected: (value: React.SetStateAction<boolean>) => void;
    isDepartmentSelected: boolean;
}
export default function SpecialitySelection({
    setIsDepartmentSelected, 
    setSelectedDepartment,
    isDepartmentSelected
}: SpecialitySelectionProps){
    
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
        <>
          {isFetching || isLoading && (<p>loading...</p>)}
          {isSuccess && (
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
        </>
    )
}