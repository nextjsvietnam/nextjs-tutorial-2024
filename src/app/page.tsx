import Link from "next/link";

export default function Home() {
  return (
    <main className="container-xl mx-auto p-4">
      <h1>Home Page</h1>
      <p>Links to other pages with a tag</p>
      <ul>
        <li>
          <a href="/products">Products</a>
        </li>
        <li>
          <a href="/products/mouse-pad-nextjsvietnam">
            Mouse Pad NextJSVietNam
          </a>
        </li>
        <li>
          <a href="/cart">Cart</a>
        </li>
        <li>
          <a href="/order">Order</a>
        </li>
        <li>
          <a href="/my-account">My Account</a>
        </li>
        <li>
          <a href="/my-orders">My orders</a>
        </li>
        <li>
          <a href="/my-orders/1">My order detail</a>
        </li>
      </ul>
      <p>Links to other pages with Link tag</p>
      <ul>
        <li>
          <Link href="/products">Products</Link>
        </li>
      </ul>
    </main>
  );
}
