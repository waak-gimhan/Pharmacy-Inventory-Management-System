import { useEffect, useState } from "react";
import API from "../services/api";

function Categories() {

    const [categories, setCategories] = useState([]);

    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await API.get("/categories");
            setCategories(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const addCategory = async (e) => {
        e.preventDefault();

        try {
            await API.post("/categories", {
                category_name: categoryName,
                description: description
            });

            setCategoryName("");
            setDescription("");

            fetchCategories();

        } catch (err) {
            console.log(err);
        }
    };

    const deleteCategory = async (id) => {

        if (!window.confirm("Delete this category?")) {
            return;
        }

        try {

            await API.delete(`/categories/${id}`);

            fetchCategories();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">

            <h1>Category Management</h1>

            <form onSubmit={addCategory}>

                <input
                    type="text"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) =>
                        setCategoryName(e.target.value)
                    }
                    required
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <button type="submit">
                    Add Category
                </button>

            </form>

            <br />

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {categories.map((cat) => (

                        <tr key={cat.category_id}>

                            <td>{cat.category_id}</td>

                            <td>{cat.category_name}</td>

                            <td>{cat.description}</td>

                            <td>
                                <button
                                    onClick={() =>
                                        deleteCategory(cat.category_id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Categories;