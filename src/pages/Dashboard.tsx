import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import DoctorForm from "../components/dashboard/forms/DoctorForm";
import DoctorEditForm from "../components/dashboard/forms/DoctorEditForm";

export default function Dashboard () {
    return (
        <div>
           <DoctorForm/>
        </div>
    )
}