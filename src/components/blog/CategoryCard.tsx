export default function CategoryCard({id, categoryName}: {id: number; categoryName: string}) {
    categoryName = categoryName[0].toUpperCase() + categoryName.slice(1, categoryName.length);
    return (
        <div className="category-card" key={id}>
                <h3>{categoryName}</h3>
        </div>
    )
}