import { useEffect, useState } from "react";
import API from "../services/api";

function ProductForm({ refreshProducts, editingProduct, clearEditing }) {

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        category_id: "",
        item_name: "",
        manufacturer: "",
        quantity: "",
        expire_date: "",
        unit_price: ""
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {

        if (editingProduct) {

            setFormData({
                category_id: editingProduct.category_id,
                item_name: editingProduct.item_name,
                manufacturer: editingProduct.manufacturer,
                quantity: editingProduct.quantity,
                expire_date: editingProduct.expire_date
                    ? editingProduct.expire_date.substring(0,10)
                    : "",
                unit_price: editingProduct.unit_price
            });

        }

    }, [editingProduct]);

    const fetchCategories = async () => {

        const res = await API.get("/categories");

        setCategories(res.data);

    };

    const handleChange = (e)=>{

        setFormData({

            ...formData,
            [e.target.name]:e.target.value

        });

    };

    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            if(editingProduct){

                await API.put(

                    `/products/${editingProduct.item_id}`,
                    formData

                );

                alert("Product Updated Successfully");

                clearEditing();

            }else{

                await API.post("/products",formData);

                alert("Product Added Successfully");

            }

            setFormData({

                category_id:"",
                item_name:"",
                manufacturer:"",
                quantity:"",
                expire_date:"",
                unit_price:""

            });

            refreshProducts();

        }catch(err){

            console.log(err);

        }

    };

    return(

        <form onSubmit={handleSubmit}>

            <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required>

                <option value="">Select Category</option>

                {

                    categories.map(cat=>(

                        <option
                        key={cat.category_id}
                        value={cat.category_id}>

                            {cat.category_name}

                        </option>

                    ))

                }

            </select>

            <input
            type="text"
            name="item_name"
            placeholder="Product Name"
            value={formData.item_name}
            onChange={handleChange}
            required
            />

            <input
            type="text"
            name="manufacturer"
            placeholder="Manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            />

            <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            />

            <input
            type="date"
            name="expire_date"
            value={formData.expire_date}
            onChange={handleChange}
            required
            />

            <input
            type="number"
            step="0.01"
            name="unit_price"
            placeholder="Unit Price"
            value={formData.unit_price}
            onChange={handleChange}
            required
            />

            <button type="submit">

                {editingProduct ? "Update Product" : "Add Product"}

            </button>

        </form>

    );

}

export default ProductForm;