import { Fragment, useEffect, useState } from "react";
import "../Style/Cart.css";
import NavBar from "../component/NavBar";

interface CartProduct {
  _id: string;
  image: string;
  name: string;
  category: string;
  price: number;
}

interface CartData {
  total: number;
  Products: CartProduct[];
}

function Cart() {
  const [cartData, setCartData] = useState<CartData>({
    total: 0,
    Products: [],
  });

  // -----------------------------
  // Fetch cart data
  // -----------------------------
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch("/cart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/login";
          }
          throw new Error("Failed to fetch cart data");
        }

        const data = await response.json();
        setCartData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCartData();
  }, []);

  // -----------------------------
  // Update total price display
  // -----------------------------
  useEffect(() => {
    const totalPriceElement = document.getElementById("totalPrice");
    if (totalPriceElement) {
      totalPriceElement.innerHTML = "Total: $" + cartData.total;
    }
  }, [cartData]);

  return (
    <Fragment>
      <NavBar />

      <div className="backgrounds">
        <div className="spacefo2">
          <div className="cart-page">
            <div className="cart-page-container">
              <div className="cart-page-header">
                <h2 className="cart-header-text">Your Games Cart</h2>
              </div>

              <div className="cart-page-table">
                <table className="cart-table-product">
                  <thead>
                    <tr className="cart-table-header">
                      <th className="cart-table-img">Product Image</th>
                      <th className="cart-table-desktop cart-table-payment">
                        Name
                      </th>
                      <th className="cart-table-desktop cart-table-size">
                        Category
                      </th>
                      <th className="cart-table-size right-text-mobile">
                        Price
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartData.Products.map((product) => (
                      <tr
                        className="cart-table-content"
                        key={product._id}
                      >
                        <td className="cart-table-image-info">
                          <img
                            src={product.image}
                            alt={product.name}
                          />
                        </td>
                        <td className="bold-text">{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="cart-table-bill">
                <div className="bill-total bold-text">
                  ${cartData.total}
                </div>
              </div>

              <div className="cart-header-footer">
                <a href="/Checkout">
                  <button
                    className="cart-header-cta red-bg"
                    type="button"
                  >
                    Proceed to Checkout
                  </button>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Cart;
