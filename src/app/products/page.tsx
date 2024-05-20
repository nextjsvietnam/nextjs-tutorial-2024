import { runUserGuard } from "@/shared/auth";
import Link from "next/link";

export default function Products() {
  // check login status
  runUserGuard();

  return (
    <main className="container-xl mx-auto p-4">
      <h1>Products</h1>
      <ul>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <>
            <li>
              <Link href={`/products/${i}`}>Product {i}</Link>
            </li>
          </>
        ))}
      </ul>
    </main>
  );
}
