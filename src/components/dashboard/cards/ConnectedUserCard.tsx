import { FiUser } from "react-icons/fi";
import "./ConnectedUserCard.css"
interface ConnectedUserInfo {
    firstName: string;
    lastName: string;
    role: string;
}
export default function ConnectedUserCard() {
    const userInfo: ConnectedUserInfo = {
        firstName: "John",
        lastName: "Doe",
        role: "staff informaticien"
    }
    return (
        <div className="connected-user-container">
            <div className="connected-user-avatar">
                <FiUser size={20} stroke="#fff"/>
            </div>
            <div className="connected-user-info">
                <h3 className="connected-user-name">{`${userInfo.firstName + " " + userInfo.lastName}`}</h3>
                <p className="connected-user-role">{userInfo.role}</p>
            </div>
        </div>
    )
}