import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../useFetch";
import Select from "react-select";
import axios from "axios";

const AddNewLead = () => {
  const BASE_URL = "https://anvaya-backend-three.vercel.app";
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    priority: "",
    timeToClose: "",
    tags: [],
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const { data, loading, error } = useFetch(`${BASE_URL}/agents`);
  useEffect(() => {
    if (data) {
      setAgents(data.agents);
    }
  }, [data]);

  const agentOptions = agents.map((agent) => ({
    label: agent.name,
    value: agent._id,
  }));

  const tagOptions = [
    { value: "High Value", label: "High Value" },
    { value: "Follow-up", label: "Follow-up" },
    { value: "Urgent", label: "Urgent" },
    { value: "Contact", label: "Contact" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const leadData = {
        ...formData,
        tags: formData.tags.map((tag) => tag.value),
      };
      await axios.post(`${BASE_URL}/leads`, leadData);
      setMessage({ type: "success", text: "Lead created successfully!" });
      navigate("/");
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.response?.data?.error || "Failed to create lead.",
      });
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
          <h1 className="main-top">Add New Lead</h1>
          <div className="main-subheading">
            <h2>Add Lead Form: </h2>
            <hr />
          </div>

          <form id="addLeadForm" className="form-group" onSubmit={handleSubmit}>
            <label htmlFor="leadName" className="form-label">
              Lead Name:
            </label>
            <input
              type="text"
              id="leadName"
              className="form-input"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <label htmlFor="leadSource" className="form-label">
              Lead Source:
            </label>
            <select
              id="leadSource"
              className="form-select"
              value={formData.source}
              onChange={(e) =>
                setFormData({ ...formData, source: e.target.value })
              }
            >
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
            </select>

            <label htmlFor="assignedAgent" className="form-label">
              Sales Agent:
            </label>
            <Select
              id="assignedAgent"
              options={agentOptions}
              className="form-select"
              onChange={(selected) =>
                setFormData({ ...formData, salesAgent: selected?.value })
              }
            />

            <label htmlFor="leadStatus" className="form-label">
              Lead Status:
            </label>
            <select
              id="leadStatus"
              className="form-select"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="New">New</option>
              <option value="Closed">Closed</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
            </select>

            <label htmlFor="priority" className="form-label">
              Priority:
            </label>
            <select
              id="priority"
              className="form-select"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <label htmlFor="timeToClose" className="form-label">
              Time to Close:
            </label>
            <input
              type="number"
              id="timeToClose"
              className="form-input"
              value={formData.timeToClose}
              onChange={(e) =>
                setFormData({ ...formData, timeToClose: e.target.value })
              }
            />

            <label htmlFor="tags" className="form-label">
              Tags:
            </label>
            <Select
              isMulti
              options={tagOptions}
              className="form-select"
              onChange={(selected) =>
                setFormData({ ...formData, tags: selected })
              }
            />
            {message.text && (
              <div
                className={`form-message ${
                  message.type === "success" ? "form-success" : "form-error"
                }`}
              >
                {message.text}
              </div>
            )}

            <button className="createLead-btn" type="submit">
              Create Lead
            </button>
          </form>
        </main>
        {/* end of main */}
      </div>
    </>
  );
};
export default AddNewLead;
