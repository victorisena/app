import Product from "@/core/Product";

interface TableProductsProps {
  products: Product[];
}

export default function TableProducts(props: TableProductsProps) {
  function headerRender() {
    return (
      <tr>
        <th className={`text-left p-4`}>Product Id</th>
        <th className={`text-left p-4`}>Value</th>
      </tr>
    );
  }

  function dataRender() {
    return props.products?.map((product, i) => {
      return (
        <tr
          key={`${i}-${product.product_id}`}
          className={`
          ${i % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}
        `}
        >
          <td className={`text-left p-4`}>{product.product_id}</td>
          <td className={`text-left p-4`}>{product.value}</td>
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
