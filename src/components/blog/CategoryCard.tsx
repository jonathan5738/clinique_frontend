export default function CategoryCard({categoryName}: {categoryName: string}) {
    return (
        <div className="category-card">
                <h3>{categoryName}</h3>
        </div>
    )
}