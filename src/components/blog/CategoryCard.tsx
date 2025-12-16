export default function CategoryCard({id, categoryName}: {id: number; categoryName: string}) {
    return (
        <div className="category-card" key={id}>
                <h3>{categoryName}</h3>
        </div>
    )
}