import { NavLink } from "react-router-dom";
import useFetch from "../../useFetch";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LeadsBySalesAgent = () => {
  const { id } = useParams();
  const BASE_URL = "https://anvaya-backend-three.vercel.app";
  const { data, loading, error } = useFetch(`${BASE_URL}/leads`);

  const [LeadData, setLeads] = useState([]);

  useEffect(() => {
    if (data) {
      setLeads(data.leads);
    }
  }, [data]);

  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState("All");
  const [sortOption, setSortOption] = useState("All");

  const getFilteredLeads = (agent) => {
    let filtered = LeadData.filter((lead) => lead.salesAgent._id === agent);

    if (selectedStatusFilter !== "All") {
      filtered = filtered.filter(
        (lead) => lead.status === selectedStatusFilter
      );
    }

    if (selectedPriorityFilter !== "All") {
      filtered = filtered.filter(
        (lead) => lead.priority === selectedPriorityFilter
      );
    }

    if (sortOption === "aesc") {
      filtered.sort((a, b) => a.timeToClose - b.timeToClose);
    } else {
      filtered.sort((a, b) => b.timeToClose - a.timeToClose);
    }
    return filtered;
  };
  const filteredLeads = getFilteredLeads(id);
  const agentName = filteredLeads[0]?.salesAgent?.name || "Unknown Agent";
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
          <h1 className="main-top">Leads By Sales Agent </h1>
          <div className="main-subheading">
            <h2>Lead List By Agent: </h2>
            <hr />
          </div>

          {/* quick filters */}
          <div className="filters">
            <div className="lead-filters">
              <div className="lead-filter">
                <label htmlFor="status-filter" className="leadfilter-label">
                  Filter by Status:
                </label>
                <select
                  id="status-filter"
                  className="select-lead-filter"
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="New">New</option>
                  <option value="Closed">Closed</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                </select>
              </div>

              <div className="lead-filter">
                <label htmlFor="prioity-filter" className="leadfilter-label">
                  Filter by Priority:
                </label>
                <select
                  id="priority-filter"
                  className="select-lead-filter"
                  value={selectedPriorityFilter}
                  onChange={(e) => setSelectedPriorityFilter(e.target.value)}
                >
                  <option value="All">All Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label htmlFor="sales-filter" className="leadfilter-label">
                  Sort By: Time To Close
                </label>
                <select
                  id="sales-filter"
                  className="select-lead-filter"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="aesc">Low to High</option>
                  <option value="desc">High To low</option>
                </select>
              </div>
              <div className="lead-filter">
                <button
                  className="reset-btn"
                  onClick={() => {
                    setSelectedPriorityFilter("All");
                    setSelectedStatusFilter("All");
                    setSortOption("");
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          {/* quick filters end */}
          <div className="status-list-div">
            <div className="status-list">
              <h2>Sales Agent: {agentName}</h2>

              <ul className="list-group">
                {getFilteredLeads(id).map((lead) => (
                  <li className="list-group-item">
                    {lead.name} - [Status - {lead.status}]
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default LeadsBySalesAgent;
