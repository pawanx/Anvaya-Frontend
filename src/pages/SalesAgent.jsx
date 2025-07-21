import { NavLink, Link } from "react-router-dom";

import useFetch from "../../useFetch";
import { useEffect } from "react";
import { useState } from "react";
const SalesAgent = () => {
  const [SalesAgentData, setAgentData] = useState([]);
  const BASE_URL = "https://anvaya-backend-three.vercel.app";
  const { data, loading, error } = useFetch(`${BASE_URL}/agents`);

  useEffect(() => {
    if (data) {
      setAgentData(data.agents);
    }
  }, [data]);
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
          <h1 className="main-top">Sales Agent Management </h1>
          <div className="main-subheading-with-btn">
            <h2 className="main-subheading-header">Sales Agent List: </h2>
            <Link className="addNewLead-btn" to="/addSalesAgent">
              Add New Agent
            </Link>
          </div>
          <hr />
          <div className="lead-list">
            <ul className="list-group">
              {SalesAgentData.map((agent) => (
                <Link
                  to={`/salesAgent/${agent._id}`}
                  style={{ textDecoration: "none", color: "#4a90e2" }}
                >
                  <li className="list-group-item" key={agent._id}>
                    <strong>Agent:</strong> {agent.name} - {agent.email}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </main>
        {/* End of Main */}
      </div>
    </>
  );
};
export default SalesAgent;
