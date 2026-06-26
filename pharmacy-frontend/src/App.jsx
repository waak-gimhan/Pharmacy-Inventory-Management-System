import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Alerts from "./pages/Alerts";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/alerts" element={<Alerts />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;