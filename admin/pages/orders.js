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
      Orders page here
      <table className="basic mt-4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Address</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr>
                <td>{order.createdAt}</td>
                <td>{order.name}</td>
                <td>
                  {order.streetAddress} {order.city}, {order.postCode},{" "}
                  {order.country}
                </td>
                <td>
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
