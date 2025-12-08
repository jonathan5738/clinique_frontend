import { toast } from "react-toastify";
import z from "zod";
type ToastType = {
    message: string;
}
function Message ({data}: {data: ToastType;}) {
    return (
        <div>
            <div>{data.message}</div>
        </div>
    )
}
export const errorNotification = (message: string) => {
    toast.error(Message, {data: {message}, autoClose: 5000, position: "bottom-center"})
}

export  const personalInfoSchema = z.object({
    firstName: z.string().min(2).max(30).trim().toLowerCase(),
    middleName: z.string().max(20).trim().toLowerCase().optional(),
    lastName: z.string().min(2, "").max(20, "").trim().toLowerCase()
})