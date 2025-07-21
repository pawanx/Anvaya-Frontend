import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../useFetch";
import axios from "axios";

const Leads = () => {
  const BASE_URL = "https://anvaya-backend-three.vercel.app";
  const { id } = useParams();

  const { data, loading, error } = useFetch(`${BASE_URL}/leads`);
  const {
    data: commentData,
    loading: commentsLoading,
    error: commentsError,
  } = useFetch(`${BASE_URL}/leads/${id}/comments`);
  const { data: agentData } = useFetch(`${BASE_URL}/agents`);

  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    timeToClose: "",
    priority: "",
  });

  const [comments, setComments] = useState([]);
  const [leadData, setLeads] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [agents, setAgents] = useState([]);
  const [agentMap, setAgentMap] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  useEffect(() => {
    if (data) {
      setLeads(data.leads);
    }
  }, [data]);

  useEffect(() => {
    if (agentData?.agents) {
      setAgents(agentData.agents);
      const map = {};
      agentData.agents.forEach((agent) => {
        map[agent._id] = agent.name;
      });
      setAgentMap(map); // <-- this is a new state variable
    }
  }, [agentData]);

  useEffect(() => {
    const selectedLead = leadData.find((lead) => lead._id === id);
    if (selectedLead) {
      setFormData(selectedLead);
    }
  }, [leadData, id]);

  useEffect(() => {
    if (id && commentData?.comments) {
      setComments(commentData.comments);
    } else {
      setComments([]);
    }
  }, [commentData, id]);

  const handleAddComment = async () => {
    if (!newCommentText.trim()) return;

    try {
      const response = await axios.post(`${BASE_URL}/leads/${id}/comments`, {
        commentText: newCommentText,
        author: formData.salesAgent?._id,
      });
      if (response.data.commentText) {
        setComments((prev) => [response.data, ...prev]);
        setNewCommentText("");
      } else {
        alert("Failed to add comment.");
      }
    } catch (error) {
      console.log("Failed to add comment");
      alert("Failed to add comment.");
    }
  };

  const handleUpdateLead = async (e) => {
    e.preventDefault();
    const updatedLead = {
      name: formData.name,
      source: formData.source,
      salesAgent:
        typeof formData.salesAgent === "object"
          ? formData.salesAgent._id
          : formData.salesAgent,
      status: formData.status,
      timeToClose: formData.timeToClose,
      priority: formData.priority,
    };

    try {
      await axios.put(`${BASE_URL}/leads/${id}`, updatedLead);
      setMessage({
        type: "success",
        text: "✅ Lead Edited successfully!",
      });

      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2000);
    } catch (error) {
      console.error("Failed to update lead:", error);
      setMessage({ type: "error", text: "❌ Failed to Edit lead." });

      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2500);
    }
  };

  return (
    <div className="view">
      {/* Sidebar */}
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

      {/* Main content */}
      <main className="main-div">
        <h1 className="main-header">
          Lead Management :<span className="lead-name">{formData.name}</span>
        </h1>

        {/* Lead Form */}
        <div className="main-subheading">
          <h2>Lead Details: </h2>
          <hr />
        </div>
        <form
          id="leadDetailsForm"
          className="form-group"
          onSubmit={handleUpdateLead}
        >
          <label htmlFor="leadName" className="form-label">
            Lead Name:
          </label>
          <input
            type="text"
            id="leadName"
            value={formData.name}
            className="form-input"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label htmlFor="assignedAgent" className="form-label">
            Sales Agent:
          </label>
          <select
            id="assignedAgent"
            className="form-input"
            value={
              typeof formData.salesAgent === "object"
                ? formData.salesAgent._id
                : formData.salesAgent
            }
            onChange={(e) => {
              const selected = agents.find(
                (agent) => agent._id === e.target.value
              );
              setFormData({ ...formData, salesAgent: selected });
            }}
          >
            <option value="">Select Sales Agent</option>
            {agents.map((agent) => (
              <option key={agent._id} value={agent._id}>
                {agent.name}
              </option>
            ))}
          </select>

          <label htmlFor="leadSource" className="form-label">
            Lead Source:
          </label>
          <select
            id="leadSource"
            className="form-input"
            value={formData.source}
            onChange={(e) =>
              setFormData({ ...formData, source: e.target.value })
            }
          >
            <option value="">Select Source</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Cold Call">Cold Call</option>
          </select>

          <label htmlFor="leadStatus" className="form-label">
            Lead Status:
          </label>
          <select
            id="leadStatus"
            className="form-input"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>
          </select>

          <label htmlFor="priority" className="form-label">
            Priority:
          </label>
          <select
            id="priority"
            className="form-input"
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
          >
            <option value="">Select Priority</option>
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
            value={formData.timeToClose}
            className="form-input"
            onChange={(e) =>
              setFormData({ ...formData, timeToClose: e.target.value })
            }
          />
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

          <button className="edit-btn" type="submit">
            Edit
          </button>
        </form>

        {/* Comments Section */}
        <div className="comment-section">
          <h2>Comment Section:</h2>
          <textarea
            id="comments"
            className="comment-area"
            cols={45}
            rows={5}
            value={newCommentText}
            placeholder="Add new comment"
            onChange={(e) => setNewCommentText(e.target.value)}
          ></textarea>
          <br />
          <button className="addNewComment-btn" onClick={handleAddComment}>
            Add New Comment
          </button>

          <div className="comment-cards">
            {comments.map((com) => (
              <div className="comment-card" key={com._id}>
                <p>
                  <strong>{agentMap[com.author] || "Unknown Agent"}</strong> -{" "}
                  <em>{new Date(com.createdAt).toLocaleString()}</em>
                </p>
                <p>{com.commentText}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leads;
