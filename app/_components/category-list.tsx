import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {

    const categories = await db.category.findMany({})
    // Pegar as categorias do banco de dados
    // Renderizar um item para cada categoria
    return (
        <div className="flex overflow-x-scroll">
            {categories.map(category => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    );
}

export default CategoryList;