import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import "./DepartmentForm.css";
import { FiCheck } from "react-icons/fi";
import { useCreateDepartmentMutation } from "../../../api";

interface CategoryInput {
    name: string;
}
const categorySchema = z.object({
    name: z.string("Veuillez enter un nom de la spécialité")
        .min(4, "Veuillez choisir un nom de spécialité plus long, s’il vous plaît")
        .max(40, "Veuillez choisir un nom de spécialité plus court, s’il vous plaît")
        .trim().toLowerCase()
});
export default function DepartmentForm(){
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<CategoryInput>({
        resolver: zodResolver(categorySchema)
    });
    const [createDepartment] = useCreateDepartmentMutation();
    const onSubmit: SubmitHandler<CategoryInput> = (data) => {
        createDepartment(data);
        setValue("name", "");
    }
    return (
        <div className="category-form-container">
            <h2>Créer un nouvel événement</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label  className="category-form-label" htmlFor="spec">Veuillez saisir un nom de spécialité</label>
                    <input className="category-form-input" id="spec" type="text" {...register("name")}/>
                    <span className="category-form-error">{errors.name ? errors.name.message: ""}</span>
                </div>
                <button className="category-button"><FiCheck size={20}/>sauvegarder</button>
            </form>
        </div>
    )
}