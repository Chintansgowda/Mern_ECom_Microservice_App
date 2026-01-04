import { Fragment, useState } from "react";
import "../Style/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      // -----------------------------
      // Store token safely
      // -----------------------------
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      alert("Email or password is incorrect");
    }
  };

  return (
    <Fragment>
      <div className="bg-img">
        <div className="content">
          <header>Login Form</header>

          <form onSubmit={handleSubmit}>
            <h4 className="fieldHeader">Email</h4>
            <div className="field">
              <input
                type="text"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <h4 className="fieldHeader space">Password</h4>
            <div className="field space">
              <input
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="field space">
              <input type="submit" value="LOGIN" />
            </div>
          </form>

          <div className="signup space">
            Don&apos;t have an account?
            <a href="/register"> Signup Now</a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
