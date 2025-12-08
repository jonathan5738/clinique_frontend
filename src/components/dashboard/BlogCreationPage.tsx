import AddPostForm from "./forms/AddPostForm";
import "./BlogCreationPage.css"
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import SpecialitySelection from "../../utils/SpecialitySelection";

interface PostExcerpt {
    titleExcerpt: string;
    bodyExcerpt: string;
    authorName: string;
}
const postExcerptSchema = z.object({
    titleExcerpt: z.string()
        .min(3, "Veuillez entrer un titre plus long, s’il vous plaît")
        .trim().toLowerCase(),
    bodyExcerpt: z.string()
        .min(10, "Veuillez entrer une description plus longue, s’il vous plaît")
        .max(100, "Veuillez entrer une description plus courte, s’il vous plaît")
        .trim(),
    authorName: z.string()
            .min(3, "Veuillez entrer un nom plus long, s’il vous plaît")
            .max(30, "Veuillez entrer un nom plus court, s’il vous plaît")
            .trim()
            .toLowerCase()
})
export function BlogCreationPage(){
    const [selectedDepartment, setSelectedDepartment] = useState<number>(0);
    const [isDepartmentSelected, setIsDepartmentSelected] = useState<boolean>(true);
    const [imagesExcerpt, setImagesExcerpt] = useState<FileList | null>(null);

    const {register, handleSubmit, formState: {errors}} = useForm<PostExcerpt>({
        resolver: zodResolver(postExcerptSchema)
    });
    const onSubmit: SubmitHandler<PostExcerpt> = (data) => {
        console.log(imagesExcerpt)
        if(selectedDepartment > 0){
            console.log(data);
        } else {
            setIsDepartmentSelected(false);
        }
    } 
    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}>           
            <div className="blog-creation-container">
                <div className="blog-creation-side-navigation">side</div>
                <div className="blog-creation-excerpt-section">
                    <h2>Enter le résumé de l'article</h2>
                    <div className="blog-creation-excerpt-section-content">
                    <div>
                        <label htmlFor="title" className="excerpt-label">titre</label>
                        <input id="title" className="excerpt-field" type="text" {...register("titleExcerpt")} />
                        {errors.titleExcerpt && <span>{errors.titleExcerpt.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="bodyExcerpt" className="excerpt-label"></label>
                        <textarea id="bodyExcerpt" className="excerpt-field bodyExcerpt" {...register("bodyExcerpt")}></textarea>
                        {errors.bodyExcerpt && <span>{errors.bodyExcerpt.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="imageExcerpt" className="excerpt-label">image</label>
                        <input id="imageExcerpt" onChange={e => setImagesExcerpt(e.target.files)} className="excerpt-field imageExcerpt" type="file"  />
                    </div>

                    <div>
                        <label htmlFor="imageExcerpt" className="excerpt-label">Nom de l'autheur</label>
                        <input className="excerpt-field" type="text" {...register("authorName")} />
                        {errors.authorName && <span>{errors.authorName.message}</span>}
                    </div>

                    <SpecialitySelection 
                       setIsDepartmentSelected={setIsDepartmentSelected}
                       setSelectedDepartment={setSelectedDepartment}
                       isDepartmentSelected={isDepartmentSelected}
                    />
                    </div>
                </div>
                <div className="blog-creation-markdown-section">
                    <h2>Create a nouvel article</h2>
                    <AddPostForm/>
                </div>
            </div>
            {/*<button style={{padding: "2rem"}}>submit</button>*/}
        </form>
    )
}