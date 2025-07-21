import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const AddNewSalesAgent = () => {
  const BASE_URL = "https://anvaya-backend-three.vercel.app";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const agentData = {
        ...formData,
      };
      await axios.post(`${BASE_URL}/agents`, agentData);
      alert("Sales agent created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error?.response?.data?.error || "Failed to create sales agent.");
    }
  };
  return (
    <>
      <div className="view">
        {/* Start of Sidebar */}
        <div className="sidebar">
          <NavLink to="/" className="home-navigation">
            <h1 className="main-top">Anvaya CRM</h1>
          </NavLink>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <NavLink to="/" className="side-nav-item">
                  Back To Dashboard
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        {/* End of Sidebar */}
        {/* Start of main */}
        <main className="main-div">
          <h1 className="main-top">Add New Sales Agent</h1>
          <div className="main-subheading">
            <h2>Sales Agent Form: </h2>
            <hr />
          </div>

          <form
            id="addLeadForm"
            className="form-group"
            onSubmit={submitHandler}
          >
            <label htmlFor="agentName" className="form-label">
              Agent Name:
            </label>
            <input
              type="text"
              id="agentName"
              className="form-input"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <label htmlFor="agentEmail" className="form-label">
              Agent Email:
            </label>
            <input
              type="email"
              id="agentEmail"
              className="form-input"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <button className="createLead-btn" type="submit">
              Create Agent
            </button>
          </form>
        </main>
        {/* end of main */}
      </div>
    </>
  );
};
export default AddNewSalesAgent;
