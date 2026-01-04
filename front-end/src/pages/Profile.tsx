import "../Style/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../component/NavBar";
import profile from "../assets/profile.jpg";
import profileg from "../assets/profileGirl.jpg";
import { useState, useEffect, Fragment } from "react";

/* ---------- User Type ---------- */
interface User {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          window.location.href = "/login";
          return;
        }
        return response.json();
      })
      .then((data: User) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Profile fetch error:", error);
        window.location.href = "/login";
      });
  }, []);

  /* ---------- Loading State ---------- */
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <NavBar />

      <div className="widt">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <div className="main-profile">
                <div className="row">

                  <div className="col-lg-4">
                    <img
                      src={user.gender === "female" ? profileg : profile}
                      alt="Profile"
                    />
                  </div>

                  <div className="col-lg-4 align-self-center">
                    <div className="main-info header-text">
                      <h1>{user.firstName}</h1>
                      <h5>{user.lastName}</h5>
                      <p>
                        I'm {user.firstName}, a passionate gamer who loves
                        exploring new worlds.
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-4 align-self-center">
                    <ul>
                      <li>Email <span>{user.email}</span></li>
                      <li>Age <span>{user.age}</span></li>
                      <li>Phone <span>{user.phone}</span></li>
                      <li>Clips <span>29</span></li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Profile;
