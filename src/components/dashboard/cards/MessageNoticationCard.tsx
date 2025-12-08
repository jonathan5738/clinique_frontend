import { Link } from "react-router";
import {FiArrowUpRight, FiBell} from "react-icons/fi";
import "./MessageNoticationCard.css";

export default function MessageNotificationCard(){
    const unreadMessageCount = 90;
    return (
        <div className="notification-parent">
            <div className="notification-container">
                <div>
                    <h3 className="notification-title">Messages recue</h3>
                    <p className="notification-description">liste des messages recues mais non lu</p>
                </div>
                <div className="notification-bell-container">
                    <FiBell size={30} className="notification-bell"/>
                    <span className="unread-message-count">{unreadMessageCount}</span>
                </div>
            </div>
            <div>
                <Link to="#" className="connect-button">Connect with
                  <div className="connect-button-icon-container">
                    <FiArrowUpRight size={20} className="connection-button-icon"/>
                  </div>
                </Link>
            </div>
        </div>
    )
}