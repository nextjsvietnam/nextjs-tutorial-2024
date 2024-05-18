type OrderProps = {
  params: {
    id: string;
  };
};
const PRODUCTS = [
  {
    id: 1,
    slug: "mouse-pad-nextjsvietnam",
    name: "Mouse Pad NextJSVietNam",
    price: 15,
    currency: "USD",
    image:
      "https://gist.github.com/assets/31009750/06f69548-c14b-47d0-b650-7af3a023b750",
  },
];

const ORDERS = [
  { id: 1, items: [{ id: 1, product: PRODUCTS[0], quality: 5 }] },
];

const findOrderById = (orderId: string) => {
  return ORDERS.find((order) => order.id === parseInt(orderId));
};

export default function MyOrderDetail({ params }: OrderProps) {
  const { id } = params;
  const order = findOrderById(id);
  return (
    <main className="container-xl mx-auto p-4">
      <h1>Order</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Quality</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order?.items.map((item) => (
            <tr>
              <td>{item.product.name}</td>
              <td>
                <img src={item.product.image} width={150} height={"auto"} />
              </td>
              <td>{item.quality}</td>
              <td>
                {item.quality * item.product.price} {item.product.currency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
