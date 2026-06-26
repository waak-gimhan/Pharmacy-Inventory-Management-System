import {useEffect,useState} from "react";

import API from "../services/api";

import ProductForm from "../components/ProductForm";

import ProductTable from "../components/ProductTable";

import AddStockModal from "../components/AddStockModal";

function Products(){

    const [products,setProducts]=useState([]);

    const [editingProduct,setEditingProduct]=useState(null);

    const [stockProduct,setStockProduct]=useState(null);

    useEffect(()=>{

        fetchProducts();

    },[]);

    const fetchProducts=async()=>{

        const res=await API.get("/products");

        setProducts(res.data);

    };

    return(

        <div className="container">

            <h1>

                Product Management

            </h1>

            <ProductForm

            refreshProducts={fetchProducts}

            editingProduct={editingProduct}

            clearEditing={()=>setEditingProduct(null)}

            />

            <br/>

            <ProductTable

            products={products}

            onEdit={setEditingProduct}

            refreshProducts={fetchProducts}

            onAddStock={setStockProduct}

            />

            {

                stockProduct &&

                <AddStockModal

                product={stockProduct}

                refreshProducts={fetchProducts}

                closeModal={()=>setStockProduct(null)}

                />

            }

        </div>

    );

}

export default Products;