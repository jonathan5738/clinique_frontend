import { useGetAllDepartmentPublicQuery, useGetAllDoctorInfoQuery } from "../../api"
import { useCallback, useState } from "react";
import { FiBookOpen, FiChevronLeft, FiChevronRight, FiEdit, FiGrid, FiHome, FiLayers, FiPlus } from "react-icons/fi";
import DoctorForm from "./forms/DoctorForm";
import DepartmentForm from "./forms/DepartmentForm";
import CategoryCard from "./cards/CategoryCard";
import useEmblaCarousel from "embla-carousel-react";
import DoctorInfoCard from "./cards/DoctorInfoCard";
import DoctorEditForm from "./forms/DoctorEditForm";
import EventForm from "./forms/EventForm";
import { Link } from "react-router";
import ConnectedUserCard from "./cards/ConnectedUserCard";
import MessageNotificationCard from "./cards/MessageNoticationCard";
import EventListCard from "./cards/EventListCard";

export default function MainPage(){
    //const [doctorPage, setDoctorPage] = useState<number>(1);
    const [showDoctorForm, setShowDoctorForm] = useState<boolean>(false);
    const [showCategoryForm, setShowCategoryForm] = useState<boolean>(false);
    const [showDoctorEditForm, setShowDoctorEditForm] = useState<{show: boolean; doctorId: number, departmentName: string}>({
        show: false, doctorId: 0, departmentName: ""
   });

   const [showEventForm, setShowEventForm] = useState<boolean>(false);


    const handleDoctorEdit = (doctorId: number, departmentName: string) => {
        setShowDoctorEditForm(prev => {
            return {...prev, doctorId, show: !prev.show, departmentName}
        });
        setShowDoctorForm(false);
    }

     const [emblaRef, emblaApi] = useEmblaCarousel()

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const {data: departments,
         isSuccess: isDepartmentSuccess,
         isFetching: isDepartmentFetching,
         isLoading: isDepartmentLoading
    } = useGetAllDepartmentPublicQuery();

    const { 
        data: doctors,
        isSuccess: isDoctorSuccess,
        isFetching: isDoctorFetching,
        isLoading: isDoctorLoading,
    } = useGetAllDoctorInfoQuery(1); // change this later

    let content;
    if(isDepartmentSuccess){
        content = departments.map(department => {
            return (
              <CategoryCard id={department.id} name={department.name}/>
            )
        })
    } else if(isDepartmentFetching || isDepartmentLoading){
        content = <p>loading...</p>
    }
    let doctorContent;
    if(isDoctorSuccess){
        doctorContent = doctors.data.map(doctor => {
            return (
              <DoctorInfoCard {...doctor} handleEditForm={handleDoctorEdit}/>
            )
        })
    } else if (isDoctorFetching || isDoctorLoading){
        doctorContent = <p>loading...</p>
    }
    return (
        <div className="dashboard-container">
         <div className="dashboard-navigation">
             <div>
                <ul className="dashboard-navigation-menu">
                    <h3>NAVIGATION</h3>
                    <li className="dash-menu-item"><Link to="/dashboard" className="dash-menu-item-link"><FiGrid className="menu-item-icon"/>Dashboard</Link></li>
                    <li className="dash-menu-item"><Link to="/" className="dash-menu-item-link"><FiHome className="menu-item-icon"/>Acceuil</Link></li>
                    <li className="dash-menu-item"><Link to="/blog" className="dash-menu-item-link"><FiBookOpen className="menu-item-icon"/>Visite le blog</Link></li>
                </ul>
                <ul className="dashboard-navigation-menu">
                    <h3>GESTION DU BLOG</h3>
                    <li className="dash-menu-item"><Link className="dash-menu-item-link" to="/dashboard/blogs/posts/new"><FiEdit className="menu-item-icon"/> Ecrire un article</Link></li>
                    <li className="dash-menu-item"><a className="dash-menu-item-link" href="#"><FiLayers className="menu-item-icon"/> Gestion du blog</a></li>
                </ul>
             </div>
         </div>
        <div className="dashboard-main">
        <div>
            <div className="dashboard-banner">
                <h2>Dashboard</h2>
                <div className="dashboard-banner-buttons">
                    <button className="add-button" onClick={() => {
                        setShowCategoryForm(e => !e);
                        setShowEventForm(false);
                    }}>
                        <div>
                           <FiPlus size={20}/>
                        </div>
                        Ajouter une specialite
                   </button>
                    <button className="add-button" onClick={() => {
                        setShowEventForm(prev => !prev);
                        setShowCategoryForm(false);
                    }}>
                        <div>
                            <FiPlus size={20}/> 
                        </div>
                        Ajouter un evenement
                    </button>
                </div>
               
            </div>
            <div>
                {showCategoryForm && (<DepartmentForm/>)}
                {showEventForm && (<EventForm/>)}
            </div>

            <div className="department-container embla">
                <h2>Liste des spécialités</h2>
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {content}
                    </div>
                </div>
                <div className="department-button-container">
                    <button className="department-button embla__prev" onClick={scrollPrev}><FiChevronLeft size={20}/>Retour</button>
                    <button className="department-button embla__next" onClick={scrollNext}><FiChevronRight size={20}/>Suivant</button>
                </div>
            </div>
            <div className="doctor-container">
                <div className="doctor-container-card">
                    <h3 className="doctor-container-card-title">Équipe medicale</h3>
                    <button className="add-button" onClick={() => {
                        setShowDoctorForm(e => !e);
                        setShowDoctorEditForm(e => {
                            return {...e, show: false}
                        })
                    }}>
                        <div>
                            <FiPlus size={20}/>
                        </div>
                        Ajouter un médecin
                    </button>
                    <div className="doctor-info-container">
                        {doctorContent}
                    </div>
                </div>
                {showDoctorForm && (<DoctorForm/>)}

                {showDoctorEditForm.show && !showDoctorForm && 
                (<DoctorEditForm 
                    doctorId={showDoctorEditForm.doctorId}
                    departmentName={showDoctorEditForm.departmentName}/>)}

            </div>
        </div>
        </div>

        <div className="dashboard-aside">
            <ConnectedUserCard/>
            <MessageNotificationCard/>
            <EventListCard/>
        </div>
        </div>
    )
}