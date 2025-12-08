import { useState } from "react";
import { useDeleteEventMutation, useGetAllEventsQuery } from "../../../api";
import "./EventListCard.css";
import { FiCalendar, FiTrash } from "react-icons/fi";
import dayjs from "dayjs";
import Pagination from "../../../utils/Pagination";

export default function EventListCard() {
    const [page, setPage] = useState<number>(1);
    const [selectedEvent, setSelectedEvent] = useState<number>(-1);
    const {data: events, isFetching, isLoading, isSuccess} = useGetAllEventsQuery(page);
    const [deleteEvent] = useDeleteEventMutation();

    let content;
    if(isSuccess){
        content = events.data.map((event, index) => {
            const isSelected = index === selectedEvent;
            return (
                <div key={event.id} onClick={() => setSelectedEvent(index)} className="event-container">
                    <div className="event-container-div">
                        <h4 className="event-title"><FiCalendar size={20}/>{event.title}</h4>
                        <div className="event-container-div-icon" onClick={() => deleteEvent(event.id)}>
                            <FiTrash size={12} stroke="#fff"/>
                        </div>
                    </div>
                    {isSelected && (
                        <div className="event-schedule-container">
                            {event.schedules.map(schedule => {
                                return (
                                    <div key={schedule.id} className="event-schedule-item">
                                        <p className="event-schedule-item-time">{`${dayjs(schedule.date).format("dddd DD MMMM YYYY")}`}</p>
                                        <p className="event-schedule-item-time">{`De ${schedule.startHour} a ${schedule.endHour}`}</p>
                                    </div>
                                ) 
                            })}
                        </div>
                    )}
                </div>
            )
        })
    } else if(isFetching || isLoading){
        content = <p>loading...</p>
    }
    return (
        <div className="event-list-container">
            <h2 className="event-list-container-title">List des evenements de la clinique</h2>
            <div>
                {content}
            </div>
            {isSuccess && (
                <Pagination 
                    page={page} 
                    setPage={setPage} 
                    hasNext={events?.hasNext}
                    hasPrev={events?.hasPrev}
                    darkColor="#333"
                    grayColor="#b8b8b8ff"
                    size={20}
             />)}
        </div>
    )
}