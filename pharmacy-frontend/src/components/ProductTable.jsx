import API from "../services/api";

function ProductTable({ products, onEdit, refreshProducts ,onAddStock }) {

    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/products/${id}`);

            alert("Product Deleted Successfully");

            refreshProducts();

        } catch (err) {

            console.log(err);

            alert("Failed to delete product.");

        }

    };

    return (

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Manufacturer</th>
                    <th>Quantity</th>
                    <th>Expire Date</th>
                    <th>Price</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {products.map((product) => (

                    <tr key={product.item_id}>

                        <td>{product.item_id}</td>

                        <td>{product.item_name}</td>

                        <td>{product.category_name}</td>

                        <td>{product.manufacturer}</td>

                        <td>{product.quantity}</td>

                        <td>
                            {new Date(product.expire_date)
                                .toLocaleDateString()}
                        </td>

                        <td>{product.unit_price}</td>

                        <td>

                            <button
                                onClick={() => onEdit(product)}
                            >
                                Edit
                            </button>

                            {" "}

                            <button
                                onClick={() => deleteProduct(product.item_id)}
                            >
                                Delete
                            </button>
                              {" "}
                               <button

                               onClick={()=>onAddStock(product)}

                                  >

                                     Add Stock

                                   </button>
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default ProductTable;