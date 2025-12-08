import { Link } from "react-router";
import "./CategoryCard.css";
interface Department {
    id: number;
    name: string;
}
export default function CategoryCard (department: Department){
    return (
        <div key={department.id} className="department-card embla__slide">
            <h3>{department.name}</h3>
            <div>
                <Link to="#">articles</Link>
            </div>
        </div>
    )
}