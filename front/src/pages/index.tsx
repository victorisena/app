import UserOrder from "@/core/UserOrder";
import Layout from "../components/Layout";
import Table from "@/components/Table";
import Order from "@/core/Order";
import Product from "../core/Product";
import Button from "@/components/Button";
import TableOrder from "@/components/Order/TableOrder";
import TableProducts from "@/components/Products/TableProducts";
import Input from "@/components/Input";
import { useState } from "react";

export default function Home() {
  const urlBase = `localhost:8081/api/order`;

  const [userOrder, setUserOrder] = useState<UserOrder[]>([]);
  const [orders, setOrders] = useState<Order[]>([new Order().empty]);
  const [products, setProducts] = useState<Product[]>([new Product().empty]);

  const [visivel, setVisivel] = useState<
    "table" | "tableOrder" | "tableProducts"
  >("table");

  const [fileContent, setFileContent] = useState("");
  const [orderId, setOrderId] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  function createFileInput() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt";
    fileInput.addEventListener("change", handleFileChange);
    fileInput.click();
  }

  function readFileContent(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  }

  async function handleFileChange(e: any) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const fileContent: any = await readFileContent(file);
    const formattedFileContent = fileContent ? fileContent.toString() : "";
    setFileContent(formattedFileContent);

    try {
      const baseUrl = `http://${urlBase}/upload`;
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(baseUrl, {
        method: "POST",
        body: formData,
        headers: {},
      });

      if (!res.ok) {
        console.log(res);
        alert(`Error: ${res.status} - ${res.statusText}`);
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }

      alert(`File uploaded!`);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function ordersSelected(orders: Order[]) {
    setVisivel(`tableOrder`);
    console.log(orders);
    setOrders(orders);
  }

  function productsSelected(products: Product[]) {
    setVisivel(`tableProducts`);
    setProducts(products);
  }

  function exportJson() {
    console.log(userOrder);
    const formattedObject = userOrder.map((item) => {
      const { user_id, name, orders } = item;

      return {
        user_id,
        name,
        orders,
      };
    });

    navigator.clipboard
      .writeText(JSON.stringify(formattedObject))
      .then(() => {
        alert("JSON copied to your clipboard");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function loadOrders() {
    const baseUrl = `http://${urlBase}`;
    let params = `?page=${currentPage}`;
    if (orderId) {
      params = `/${orderId}`;
    }

    if (startDate && endDate) {
      params += `&startDate=${startDate}&endDate=${endDate}`;
    }

    const res = await fetch(`${baseUrl}${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 422) {
      throw new Error("Validation failed.");
    }

    const data = await res.json();
    const orderUsersFormatted = data.orders.map((order: any) => {
      const { user_id, name, orders } = order[0];
      return new UserOrder(user_id, name, orders);
    });

    setUserOrder(orderUsersFormatted);
  }

  return (
    <div
      className={`
      flex justify-center items-center p-5
    bg-slate-900 text-white min-h-screen 
    `}
    >
      <Layout title="Orders Import">
        <div className={`flex justify-end`}>
          {visivel === `table` ? (
            <>
              <Button
                className={`mb-4 mr-1`}
                onClick={() => {
                  createFileInput();
                }}
              >
                Import
              </Button>
              <Button className={`mb-4 mr-1`} onClick={() => loadOrders()}>
                Search
              </Button>
              <Button
                className={`mb-4 mr-1`}
                onClick={() => {
                  exportJson();
                }}
              >
                Export JSON
              </Button>
            </>
          ) : (
            <>
              <Button
                className={`mb-4 mr-1`}
                onClick={() => {
                  setVisivel("table");
                  setCurrentPage(1);
                  setOrderId(0);
                  setStartDate("");
                  setEndDate("");
                }}
              >
                Back to Home
              </Button>
              <Button
                className={`mb-4 mr-1`}
                onClick={() => {
                  exportJson();
                }}
              >
                Copy JSON
              </Button>
            </>
          )}
        </div>

        {visivel === `table` ? (
          <>
            <Input
              text="Order Id"
              type="number"
              onChangeValue={(value: any) => {
                setOrderId(value);
              }}
            />
            <Input
              text="Start Date"
              type="date"
              onChangeValue={(value: any) => {
                setStartDate(value);
              }}
            />
            <Input
              text="End Date"
              type="date"
              onChangeValue={(value: any) => {
                setEndDate(value);
              }}
            />
          </>
        ) : (
          false
        )}

        {visivel === `table` ? (
          <>
            <Table userOrders={userOrder} ordersSelected={ordersSelected} />
          </>
        ) : (
          false
        )}

        {visivel === `tableOrder` ? (
          <>
            <TableOrder orders={orders} productsSelected={productsSelected} />
          </>
        ) : (
          false
        )}

        {visivel === `tableProducts` ? (
          <>
            <TableProducts products={products} />
          </>
        ) : (
          false
        )}

        <div className={`flex items-center justify-end`}>
          <Button
            className={`mt-4 mr-1`}
            onClick={async () => {
              setCurrentPage((prevPage) =>
                prevPage >= 2 ? prevPage - 1 : prevPage
              );
              await loadOrders();
            }}
          >
            -
          </Button>
          <Button
            className={`mt-4 mr-1`}
            onClick={async () => {
              setCurrentPage((prevPage) => prevPage + 1);
              await loadOrders();
            }}
          >
            +
          </Button>
        </div>
      </Layout>
    </div>
  );
}
