import Layout from "@/Components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic mt-4 table-auto" key="order">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Address</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key="tr">
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td
                  key={order.name}
                  className={
                    order.paid
                      ? "font-medium text-green-600"
                      : "font-medium text-red-600"
                  }
                >
                  {order.paid ? "Paid" : "No"}
                </td>
                <td key={order.name}>{order.name}</td>
                <td key={order.name}>
                  {order.streetAddress} {order.city}, {order.postCode},{" "}
                  {order.country}
                </td>
                <td key={order.name}>
                  {order.line_items.map((l) => (
                    <>
                      {l?.price_data.product_data?.name} x {l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
