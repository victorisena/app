import UserOrder from "@/core/UserOrder";
import Order from "@/core/Order";
import { DetailIcon } from "./Icons";

interface TableProps {
  userOrders: UserOrder[];
  ordersSelected?: (order: Order[]) => void;
}

export default function Table(props: TableProps) {
  const showDetails = props.ordersSelected;

  function headerRender() {
    return (
      <tr>
        <th className={`text-left p-4`}>User Id</th>
        <th className={`text-left p-4`}>Name</th>
        { showDetails ? (<th className={`p-4`}>Orders</th>) : false}
      </tr>
    );
  }

  function ordersRender(orders: Order[]) {
    return (
      <td
        className={`
        flex justify-center
      `}
      >
        {props.ordersSelected ? (
          <button
            onClick={() => props.ordersSelected?.(orders)}
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
    return props.userOrders?.map((userOrder, i) => {
      return (
        <tr
          key={`${i}-${userOrder.user_id}`}
          className={`
          ${i % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}
        `}
        >
          <td className={`text-left p-4`}>{userOrder.user_id}</td>
          <td className={`text-left p-4`}>{userOrder.name}</td>
          {showDetails ? ordersRender(userOrder.orders) : false}
        </tr>
      );
    });
  }

  return (
    <table className={`w-full rounded-xl overflow-hidden mt-2`}>
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
