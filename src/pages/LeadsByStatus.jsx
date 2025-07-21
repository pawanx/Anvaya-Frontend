import { NavLink } from "react-router-dom";

import { useState } from "react";
import useFetch from "../../useFetch";

const LeadsByStatus = () => {
  const BASE_URL = "https://anvaya-backend-three.vercel.app";
  const [selectedSalesFilter, setSelectedSalesFilter] = useState("All");
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState("All");
  const [sortOption, setSortOption] = useState("All");

  const { data, loading, error } = useFetch(`${BASE_URL}/leads`);

  const getFilteredLeads = (status) => {
    if (!data?.leads) return [];
    let filtered = data.leads.filter((lead) => lead.status === status);

    if (selectedSalesFilter !== "All") {
      filtered = filtered.filter(
        (lead) => lead.salesAgent === selectedSalesFilter
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
          <h1 className="main-top">Leads By Status </h1>
          <div className="main-subheading">
            <h2>Lead List By Status: </h2>
            <hr />
          </div>

          {/* quick filters */}
          <div className="filters">
            <div className="lead-filters">
              <div className="lead-filter">
                <label htmlFor="sales-filter" className="leadfilter-label">
                  Filter by Sales:
                </label>
                <select
                  id="sales-filter"
                  className="select-lead-filter"
                  value={selectedSalesFilter}
                  onChange={(e) => setSelectedSalesFilter(e.target.value)}
                >
                  <option value="All">All Agents</option>
                  <option value="Alice Johnson">Alice Johnson</option>
                  <option value="Bob Williams">Bob Williams</option>
                  <option value="Charlie Brown">Charlie Brown</option>
                </select>
              </div>

              <div className="lead-filter">
                <label htmlFor="prioity-filter" className="leadfilter-label">
                  Filter by Priority:
                </label>
                <select
                  id="status-filter"
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
                    setSelectedSalesFilter("All");
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
              <h2>Status: New</h2>

              <ul className="list-group">
                {getFilteredLeads("New").map((lead) => (
                  <li className="list-group-item" key={lead._id}>
                    {lead.name} - [Sales Agent - {lead.salesAgent.name}]
                  </li>
                ))}
              </ul>
            </div>

            <div className="status-list">
              <h2>Status: Contacted</h2>

              <ul className="list-group">
                {getFilteredLeads("Contacted").map((lead) => (
                  <li className="list-group-item" key={lead._id}>
                    {lead.name} - [Sales Agent - {lead.salesAgent.name}]
                  </li>
                ))}
              </ul>
            </div>
            <div className="status-list">
              <h2>Status: Qualified</h2>

              <ul className="list-group">
                {getFilteredLeads("Qualified").map((lead) => (
                  <li className="list-group-item" key={lead._id}>
                    {lead.name} - [Sales Agent - {lead.salesAgent.name}]
                  </li>
                ))}
              </ul>
            </div>

            <div className="status-list">
              <h2>Status: Closed</h2>

              <ul className="list-group">
                {getFilteredLeads("Closed").map((lead) => (
                  <li className="list-group-item" key={lead._id}>
                    {lead.name} - [Sales Agent - {lead.salesAgent.name}]
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
export default LeadsByStatus;
