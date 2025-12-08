
import "./Carousel.css";
import { useRef, useState } from "react";
import { useGetAllEventsQuery } from "../../api";
import dayjs from "dayjs";
import { PiCalendarDots, PiTimer} from "react-icons/pi";
import { useGSAP } from "@gsap/react";
import {gsap} from "gsap";

function Carousel (){
    //const [page, setPage] = useState<number>(1);    
    const {data: events, isFetching, isLoading, isSuccess} = useGetAllEventsQuery(1); // change this latter
    /*const handlePaginationClick = (e: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }*/
    const container = useRef<HTMLDivElement | null>(null);
    let yPos = 50;
    useGSAP(() => {
        if(isSuccess){
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".carousel-container",
                    start: "20% 80%",
                }
            })
            tl
            .from(".carousel-main-title", {y: yPos, opacity: 0})
            .from(".carousel-card", {y: yPos, opacity: 0, stagger: .2})
        }
    }, {scope: container, dependencies: [isSuccess]})

    let content;

    if(isSuccess){
    content = events.data.map((post, index) => {
        return (
            <div key={index} className="carousel-card">
                <h2 className="carousel-title">{post.title}</h2>
                <p className="carousel-description">{post.description}</p>
                <div className="event-schedule-container">
                {post.schedules.map(schedule =>  {
                    return (
                        <div key={schedule.id} className="event-schedule-card">
                            <p className="event-schedule-date"><PiCalendarDots  className="event-schedule-icon" size={20} />{dayjs(schedule.date).format('dddd DD MMMM YYYY')}</p>
                            <p className="event-schedule-time"><PiTimer className="event-schedule-icon" size={20}/>de {schedule.startHour} a {schedule.endHour}</p>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    });
   }
    return (
      <div className="carousel-bannier" ref={container}> 
        {isLoading || isFetching && (
            <div>loading...</div>
        )}
        {isSuccess && events.totalPage > 0 && (
        <>
            <div className="carousel-container">
            <h2 className="carousel-main-title">Notre fils d'actualité</h2>
                {content}
            </div>
        </>
       )}
        <div className="carousel-pagination-container"> 
        {/*{isSuccess && events.totalPage > 1 && (
          <Pagination className="carousel-pagination" count={events?.totalPage}
            page={page}
           onChange={handlePaginationClick} color="primary"/>
        )}*/}
        </div>
      </div>
    )
}
export default Carousel;