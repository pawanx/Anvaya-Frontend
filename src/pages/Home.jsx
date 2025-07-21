import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetch from "../../useFetch";

const Home = () => {
  const BASE_URL = "https://anvaya-backend-three.vercel.app";
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [LeadData, setLeads] = useState([]);
  const { data, loading, error } = useFetch(`${BASE_URL}/leads`);

  useEffect(() => {
    if (data) {
      setLeads(data.leads);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Occured while fetching data.</p>;

  const filteredLeadData =
    selectedFilter === "All"
      ? LeadData
      : LeadData.filter((data) => data.status === selectedFilter);
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
                <NavLink to="/leadList" className="side-nav-item">
                  Leads
                </NavLink>
              </li>
              <li>
                <NavLink to="/leadStatusView" className="side-nav-item">
                  Sales
                </NavLink>
              </li>
              <li>
                <NavLink to="/salesAgent" className="side-nav-item">
                  Agents
                </NavLink>
              </li>
              <li>
                <NavLink to="/reports" className="side-nav-item">
                  Reports
                </NavLink>
              </li>
              <li>
                <NavLink to="#" className="side-nav-item">
                  Settings
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        {/* End of Sidebar */}
        {/*Start of main  */}
        <main>
          <div className="dashboard-top">
            <h1>Dashboard</h1>
            <Link className="add-new-btn" to="/addLead">
              Add New Lead
            </Link>
          </div>

          {/* quick filters */}
          <div className="filters">
            <h2>Quick Filters: </h2>
            <div className="filter">
              <span
                className={`filter-item ${
                  selectedFilter === "New" ? "active-filter" : ""
                }`}
                onClick={() => setSelectedFilter("New")}
              >
                New
              </span>
              <span
                className={`filter-item ${
                  selectedFilter === "Contacted" ? "active-filter" : ""
                }`}
                onClick={() => setSelectedFilter("Contacted")}
              >
                Contacted
              </span>
              <span
                className={`filter-item ${
                  selectedFilter === "Qualified" ? "active-filter" : ""
                }`}
                onClick={() => setSelectedFilter("Qualified")}
              >
                Qualified
              </span>
              <span
                className={`filter-item ${
                  selectedFilter === "Closed" ? "active-filter" : ""
                }`}
                onClick={() => setSelectedFilter("Closed")}
              >
                Closed
              </span>
              <span
                className="filter-item qualified"
                onClick={() => setSelectedFilter("All")}
              >
                Reset
              </span>
            </div>
          </div>
          {/* quick filters end */}

          <div className="row">
            {filteredLeadData.map((data) => (
              <div className="card-col" key={data._id}>
                <Link to={`/leads/${data._id}`} className="card-link">
                  <div className="card">
                    <h3>{data.name}</h3>
                    <p>Status: {data.status}</p>
                    <p>Agent: {data.salesAgent?.name || "Unassigned"}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="lead-status">
            <h2>Lead Status: </h2>
            <div className="lead-details">
              <div>New: </div>
              <div>
                [{LeadData.filter((lead) => lead.status === "New").length}]
                Leads
              </div>
            </div>
            <div className="lead-details">
              <div>Contacted: </div>
              <div>
                {" "}
                [{LeadData.filter((lead) => lead.status === "Contacted").length}
                ] Leads
              </div>
            </div>
            <div className="lead-details">
              <div>Qualified: </div>
              <div>
                [{LeadData.filter((lead) => lead.status === "Qualified").length}
                ] Leads
              </div>
            </div>
            <div className="lead-details">
              <div>Closed: </div>
              <div>
                [{LeadData.filter((lead) => lead.status === "Closed").length}]
                Leads
              </div>
            </div>
          </div>
        </main>
        {/* End of main */}
      </div>
    </>
  );
};
export default Home;
