import "../Style/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, useState, useEffect } from "react";

/* ---------- Product Type ---------- */
interface Product {
  image: string;
  name: string;
  description: string;
  category: string;
  price: number;
}

function ProductInfo() {
  const [product, setProduct] = useState<Product | null>(null);
  const productID = localStorage.getItem("productID");

  useEffect(() => {
    if (!productID) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `/product/${productID}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [productID]);

  // -----------------------------
  // Add product to cart
  // -----------------------------
  const onSubmithandler = () => {
    const token = localStorage.getItem("token");

    if (!token || !productID) {
      window.location.href = "/login";
      return;
    }

    fetch(`/cart/${productID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Added to cart");
        } else {
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  /* ---------- Loading State ---------- */
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <div className="widt">
        <div className="main-profile">
          <div className="row">
            <div className="col-lg-4">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="col-lg-4 align-self-center">
              <div className="main-info header-text">
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <button
                  className="searchButton"
                  onClick={onSubmithandler}
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="col-lg-4 align-self-center">
              <ul>
                <li>
                  Game Category <span>{product.category}</span>
                </li>
                <li>
                  Price <span>{product.price}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductInfo;
