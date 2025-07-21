import { NavLink, Link } from "react-router-dom";
import useFetch from "../../useFetch";
import axios from "axios";

import { useState, useEffect } from "react";
const LeadList = () => {
  const BASE_URL = "https://anvaya-backend-three.vercel.app";
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const [selectedSalesFilter, setSelectedSalesFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [LeadData, setLeads] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const { data, loading, error } = useFetch(`${BASE_URL}/leads`);

  useEffect(() => {
    if (data) {
      setLeads(data.leads);
    }
  }, [data]);

  const filteredLeadData = LeadData.filter((lead) => {
    const statusMatches =
      selectedStatusFilter === "All" || lead.status === selectedStatusFilter;
    const salesMatches =
      selectedSalesFilter === "All" ||
      lead.salesAgent.name === selectedSalesFilter;
    return salesMatches && statusMatches;
  });

  const sortedLeadData = [...filteredLeadData].sort((a, b) => {
    if (sortOption === "Priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortOption === "Time To Close") {
      return a.timeToClose - b.timeToClose;
    }
    return 0;
  });

  const handleDelete = async (leadId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/leads/${leadId}`);
      setLeads((prev) => prev.filter((lead) => lead._id !== leadId));
      setMessage({ type: "success", text: "✅ Lead deleted successfully." });

      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2500);
    } catch (err) {
      console.error("Error deleting lead:", err);
      setMessage({ type: "error", text: "❌ Failed to delete lead." });

      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2500);
    }
  };

  return (
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
        <h1 className="main-top">Lead List</h1>

        <div className="main-subheading-with-btn">
          <h2 className="main-subheading-header">Lead Overview: </h2>
          <Link className="addNewLead-btn" to="/addLead">
            Add New Lead
          </Link>
        </div>
        <hr />

        {/* ✅ Success/Error Message */}
        {message.text && (
          <div
            className={`form-message ${
              message.type === "success" ? "form-success" : "form-error"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* quick filters */}
        <div className="filters">
          <div className="lead-filters">
            <div className="lead-filter">
              <label htmlFor="status-filter" className="leadfilter-label">
                Filter by Status:{" "}
              </label>
              <select
                id="status-filter"
                className="select-lead-filter"
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="lead-filter">
              <label htmlFor="status-filter" className="leadfilter-label">
                Filter by Agents:
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
            <div>
              <label htmlFor="sales-filter" className="leadfilter-label">
                Sort By:
              </label>
              <select
                id="sales-filter"
                className="select-lead-filter"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">None</option>
                <option value="Priority">Priority</option>
                <option value="Time To Close">Time To Close</option>
              </select>
            </div>
            <div className="lead-filter">
              <button
                className="reset-btn"
                onClick={() => {
                  setSelectedStatusFilter("All");
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

        {/* start of lead details */}

        <div className="lead-list">
          <ul className="list-group">
            {sortedLeadData.map((lead) => (
              <li className="list-group-item list-delete">
                {lead.name} - {lead.status} - {lead.salesAgent.name}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(lead._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};
export default LeadList;
