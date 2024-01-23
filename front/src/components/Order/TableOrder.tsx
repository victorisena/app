import Product from "@/core/Product";
import Order from "@/core/Order";
import { DetailIcon } from "../Icons";

interface TableOrderProps {
  orders: Order[];
  productsSelected?: (product: Product[]) => void;
}

export default function TableOrder(props: TableOrderProps) {
  const showDetails = props.productsSelected;

  function headerRender() {
    return (
      <tr>
        <th className={`text-left p-4`}>Order Id</th>
        <th className={`text-left p-4`}>Total</th>
        <th className={`text-left p-4`}>Date</th>
        {showDetails ? <th className={`p-4`}>Products</th> : false}
      </tr>
    );
  }

  function productsRender(products: Product[]) {
    return (
      <td
        className={`
            flex justify-center
          `}
      >
        {props.productsSelected ? (
          <button
            onClick={() => props.productsSelected?.(products)}
            className={`
                flex justify-center items-center
                text-black rounded-full p-2 m-1
                hover:bg-blue-50
            `}
          >
            {DetailIcon}
          </button>
        ) : (
          false
        )}
      </td>
    );
  }

  function dataRender() {
    return props.orders?.map((order, i) => {
      return (
        <tr
          key={`${i}-${order.order_id}`}
          className={`
          ${i % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}
        `}
        >
          <td className={`text-left p-4`}>{order.order_id}</td>
          <td className={`text-left p-4`}>{order.total}</td>
          <td className={`text-left p-4`}>{new Date(order.date).toLocaleDateString()}</td>
          {showDetails ? productsRender(order.products) : false}
        </tr>
      );
    });
  }

  return (
    <table className={`w-full rounded-xl overflow-hidden`}>
      <thead
        className={`
            text-gray-100
            bg-gradient-to-r from-gray-500 to-gray-600
      `}
      >
        {headerRender()}
      </thead>

      <tbody>{dataRender()}</tbody>
    </table>
  );
}
