import "./Specialities.css"
import { useGetAllDepartmentPublicQuery, type DoctorInfo } from "../../api"
import {  useRef, useState } from "react";
import Group11 from "../../assets/img/Group 11.jpg";
import { useGSAP } from "@gsap/react";
import {gsap} from "gsap"
import DoctorScheduleCard from "../../utils/DoctorScheduleCard";

function Specialites(){
    const {data, isSuccess, isLoading, isFetching, isError} = useGetAllDepartmentPublicQuery();
    const [selectedItem, setSelectedItem] = useState<number>(-1);
    const [selectedDoctor, setSelectedDoctor] = useState<number>(-1);

    const handleDoctorClick = (index: number) => {
        if(index === selectedDoctor){
            setSelectedDoctor(-1);
            return;
        }
        setSelectedDoctor(index);
    }

    const container = useRef<HTMLDivElement | null>(null);
    useGSAP(() => {
        if(isSuccess){
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".spec-main-text",
            },
            defaults: {
                y: 40,
                opacity: 0
            }
        })
        tl.from(".spec-main-title", {})
          .from(".spec-main-para", {}, "-=.3")
          .from(".spec-card", {stagger: .2})
          .from(".spec-doc-content", {}, "-=.4")
    }
    }, {scope: container, dependencies: [isSuccess]})

    const handleClick = (index: number) => {
        if(index === selectedItem){
            //setSelectedItem(-1);
            return;
        }
        setSelectedItem(index);
    }
    let renderedList;
    
    console.log(data);
    if(isSuccess){
        renderedList = data.map((spec, index) => {
            const show = index === selectedItem;
            return (
                <div key={spec.id} onClick={() => handleClick(index)} className="spec-card">
                    <h3 className="spec-title">{spec.name}</h3>
                    {show && (<div>
                        {spec.doctors.map((doctor, index) => {
                            const chosenDoctor = index === selectedDoctor;
                            return (
                                <div key={doctor.id}>
                                    <h4 className="spec-doctor-name" onClick={() => handleDoctorClick(index)}>{`Docteur ${doctor.firstName} ${doctor.lastName}`}</h4>
                                    {chosenDoctor && (
                                        <div>
                                           <DoctorScheduleCard data={doctor.schedules.filter(e => e.isSelected)} /> 
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>)}
                </div>
            )
        })
    } else if(isLoading || isFetching){
        console.log("loading...")
    } else if(isError) {
        console.log("something went wrong")
    }
    return (
        <div className="spec-main" ref={container}>
            <div className="spec-main-text">
                <h3 className="spec-main-title">Nos specialités <br />et services</h3>
                <p className="spec-main-para spec-para">Veuillez cliquez sur la spécialité ou service qui vous intéresse 
                    afin de consulter les horaires des différents médecins.</p>
            </div>
            {isSuccess && (
            <div className="spec-container">
                 <div className="spec-list">
                   {renderedList}
                 </div>


                 <div className="spec-doc-content">
                    <img src={Group11} alt="" />
                 </div>
            </div>
            )}
        </div>
    )
}
export default Specialites