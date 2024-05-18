import Link from "next/link";

type ProductDetailProps = {
  params: {
    slug: string;
  };
};

// let's fake a function to find product detail by slug/id
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

const findProductBySlugOrId = (value: string) => {
  // find by id first
  let product = null;
  try {
    const id: number = parseInt(value);
    product = PRODUCTS.find((p) => p.id == id);
    if (product) {
      return product;
    }
    // otherwise find by slug
    product = PRODUCTS.find((p) => p.slug === value.toLowerCase());
  } catch (error) {
    console.log(error);
  }

  return product;
};

export default function ProductDetail({ params }: ProductDetailProps) {
  const { slug } = params;
  const product = findProductBySlugOrId(slug);
  let content = <></>;
  if (!product) {
    content = (
      <>
        <h1>Product not found!</h1>
        <p>
          Please go back to <Link href="/products">product list</Link>
        </p>
      </>
    );
  } else {
    content = (
      <>
        <h1>Product Detail</h1>
        <p>Name: {product.name}</p>
        <p>
          Price: {product.price} {product.currency}
        </p>
        <p>
          <img src={product.image} alt={product.name} />
        </p>
      </>
    );
  }
  return <main className="container-xl mx-auto p-4">{content}</main>;
}
