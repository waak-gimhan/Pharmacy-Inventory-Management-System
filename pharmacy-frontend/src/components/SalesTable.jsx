function SalesTable({ sales }) {

    return (

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Medicine</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Date</th>

                </tr>

            </thead>

            <tbody>

                {sales.map((sale) => (

                    <tr key={sale.sale_id}>

                        <td>{sale.sale_id}</td>
                        <td>{sale.item_name}</td>
                        <td>{sale.quantity_sold}</td>
                        <td>Rs. {sale.unit_price}</td>
                        <td>Rs. {sale.total_amount}</td>
                        <td>
                            {new Date(sale.sale_date).toLocaleDateString()}
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default SalesTable;