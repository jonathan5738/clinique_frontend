import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Pagination.css"
interface PaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    hasPrev: boolean;
    hasNext: boolean;
    darkColor: string;
    grayColor: string;
    size: number;
}
export default function Pagination({
    page, setPage, hasNext, 
    hasPrev, darkColor, grayColor, size
}: PaginationProps){
    
    const handleNextPage = () => {
        if(hasNext){
            const nextPage = page + 1;
            setPage(nextPage)
        }
    }
    const handlePrevPage = () => {
        if(hasPrev){
            const previousPage = page - 1;
            setPage(previousPage);
        }
    }
    return (
        <div className="pagination-container">
            <FiChevronLeft
                onClick={handlePrevPage}
                size={size} 
                color={`${hasPrev ? darkColor: grayColor}`} 
                className="left-chevron"/>

            <FiChevronRight
                onClick={handleNextPage}
                size={size} 
                color={`${hasNext ? darkColor: grayColor}`} 
                className="right-chevron"/>

        </div>
    )
}