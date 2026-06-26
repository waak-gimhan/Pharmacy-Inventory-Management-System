import { useState } from "react";
import API from "../services/api";

function AddStockModal({

    product,
    refreshProducts,
    closeModal

}){

    const [quantity,setQuantity]=useState("");

    const addStock=async(e)=>{

        e.preventDefault();

        try{

            await API.put(

                `/products/${product.item_id}/add-stock`,

                {

                    quantity:Number(quantity)

                }

            );

            alert("Stock Added Successfully");

            refreshProducts();

            closeModal();

        }

        catch(err){

            console.log(err);

            alert("Failed to Add Stock");

        }

    };

    return(

        <div className="modal">

            <div className="modal-content">

                <h2>Add Stock</h2>

                <p>

                    <strong>Product :</strong>

                    {product.item_name}

                </p>

                <p>

                    <strong>Current Stock :</strong>

                    {product.quantity}

                </p>

                <form onSubmit={addStock}>

                    <input

                    type="number"

                    placeholder="Enter Quantity"

                    value={quantity}

                    onChange={(e)=>setQuantity(e.target.value)}

                    required

                    />

                    <br/><br/>

                    <button type="submit">

                        Add Stock

                    </button>

                    {" "}

                    <button

                    type="button"

                    onClick={closeModal}

                    >

                        Cancel

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddStockModal;