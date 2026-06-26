import { useEffect, useState } from "react";
import API from "../services/api";
import SalesTable from "../components/SalesTable";

function Sales() {

    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProducts();
        fetchSales();
    }, []);

    useEffect(() => {

        const result = sales.filter((sale) =>
            sale.item_name.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredSales(result);

    }, [search, sales]);

    const fetchProducts = async () => {
        try {
            const res = await API.get("/products");
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchSales = async () => {
        try {
            const res = await API.get("/sales");
            setSales(res.data);
            setFilteredSales(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleProductChange = (e) => {

        const product = products.find(
            p => p.item_id === Number(e.target.value)
        );

        setSelectedProduct(product);
        setQuantity("");
        setTotal(0);
    };

    const handleQuantity = (e) => {

        const qty = Number(e.target.value);

        setQuantity(qty);

        if (selectedProduct) {
            setTotal(qty * selectedProduct.unit_price);
        }
    };

    const sellMedicine = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/sales", {

                item_id: selectedProduct.item_id,
                quantity_sold: quantity

            });

            alert(res.data.message);

            fetchProducts();
            fetchSales();

            setSelectedProduct(null);
            setQuantity("");
            setTotal(0);

        } catch (err) {

            if (err.response) {
                alert(err.response.data.message);
            }

        }

    };

    return (

        <div className="container">

            <h1>Sales Management</h1>

            <form onSubmit={sellMedicine}>

                <select
                    value={selectedProduct ? selectedProduct.item_id : ""}
                    onChange={handleProductChange}
                    required
                >

                    <option value="">
                        Select Product
                    </option>

                    {products.map(product => (

                        <option
                            key={product.item_id}
                            value={product.item_id}
                        >
                            {product.item_name}
                        </option>

                    ))}

                </select>

                {selectedProduct && (

                    <>

                        <p>
                            Current Stock : {selectedProduct.quantity}
                        </p>

                        <p>
                            Unit Price : Rs.{selectedProduct.unit_price}
                        </p>

                        <input
                            type="number"
                            placeholder="Quantity Sold"
                            value={quantity}
                            onChange={handleQuantity}
                            required
                        />

                        <h3>
                            Total : Rs.{total}
                        </h3>

                        <button>
                            Sell Medicine
                        </button>

                    </>

                )}

            </form>

            <hr />

            <h2>Sales History</h2>

            <input
                type="text"
                placeholder="Search medicine..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <br /><br />

            <SalesTable sales={filteredSales} />

        </div>

    );

}

export default Sales;