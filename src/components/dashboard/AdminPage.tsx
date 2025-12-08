import { Link, Outlet } from "react-router";
import "./AdminPage.css";
import ConnectedUserCard from "./cards/ConnectedUserCard";
import MessageNotificationCard from "./cards/MessageNoticationCard";
import { FiBookOpen, FiEdit, FiGrid, FiHome, FiLayers } from "react-icons/fi";
import EventListCard from "./cards/EventListCard";


export default function AdminPage() {
    return (
        <div className="dashboard-container">
        <div className="dashboard-navigation">
            <div>
                <ul className="dashboard-navigation-menu">
                    <h3>NAVIGATION</h3>
                    <li className="dash-menu-item"><Link to="/dashboard" className="dash-menu-item-link"><FiGrid className="menu-item-icon"/>Dashboard</Link></li>
                    <li className="dash-menu-item"><Link to="/" className="dash-menu-item-link"><FiHome className="menu-item-icon"/>Acceuil</Link></li>
                    <li className="dash-menu-item"><Link to="/blog/posts" className="dash-menu-item-link"><FiBookOpen className="menu-item-icon"/>Visite le blog</Link></li>
                </ul>
                <ul className="dashboard-navigation-menu">
                    <h3>GESTION DU BLOG</h3>
                    <li className="dash-menu-item"><Link className="dash-menu-item-link" to="/dashboard/blogs/posts/new"><FiEdit className="menu-item-icon"/> Ecrire un article</Link></li>
                    <li className="dash-menu-item"><a className="dash-menu-item-link" href="#"><FiLayers className="menu-item-icon"/> Gestion du blog</a></li>
                </ul>

            </div>
        </div>
        <div className="dashboard-main">
            <Outlet/>
        </div>

        <div className="dashboard-aside">
            <ConnectedUserCard/>
            <MessageNotificationCard/>
            <EventListCard/>
        </div>
    </div>
    )
}