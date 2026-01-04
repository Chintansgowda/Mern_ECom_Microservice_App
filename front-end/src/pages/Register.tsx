import "../Style/Register.css";
import { useState } from "react";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // -----------------------------
    // Validate password
    // -----------------------------
    if (password !== confpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          age,
          phone,
          gender,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("Registered successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="bg-img">
      <div className="registerContent">
        <header>Register Form</header>

        {/* ❗ NO action attribute */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <h6>First name</h6>
            </div>
            <div className="col">
              <h6>Last name</h6>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                required
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                required
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <h6>Email</h6>
            </div>
            <div className="col">
              <h6>Phone number</h6>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <input
                type="email"
                className="form-control"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                required
                placeholder="Phone"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <h6>Password</h6>
            </div>
            <div className="col">
              <h6>Confirm password</h6>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <input
                type="password"
                className="form-control"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="password"
                className="form-control"
                required
                placeholder="Confirm password"
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <h6>Age</h6>
            </div>
            <div className="col">
              <h6>Gender</h6>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                required
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Gender"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>

          <div className="field space">
            <input type="submit" value="Register Now" />
          </div>
        </form>

        <div className="signup space">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
