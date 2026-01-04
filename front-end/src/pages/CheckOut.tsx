import { Fragment } from "react";
import "../Style/CheckOut.css";

function CheckOut() {

  // -----------------------------
  // Checkout handler
  // -----------------------------
  const submitHandler = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch("/cart/checkout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      alert("Your order has been placed!");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout");
    }
  };

  return (
    <Fragment>
      <div className="wrapper">
        <div className="spaceto">
          <div className="containers">
            <div className="title">Checkout Form</div>

            <div className="input-form">
              <div className="section-1">
                <div className="items">
                  <label className="label">Card Number</label>
                  <input
                    type="text"
                    className="input"
                    maxLength={16}
                    placeholder="1234 1234 1234 1234"
                  />
                </div>
              </div>

              <div className="section-2">
                <div className="items">
                  <label className="label">Card Holder</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="section-3">
                <div className="items">
                  <label className="label">Expire Date</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="MM / YY"
                  />
                </div>

                <div className="items">
                  <label className="label">CVC</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            <div className="bat" onClick={submitHandler}>
              Proceed
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CheckOut;
