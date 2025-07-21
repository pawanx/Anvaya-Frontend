import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

const Reports = () => {
  const BASE_URL = "https://anvaya-backend-three.vercel.app";
  const [pipelineData, setPipelineData] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const pipelineRes = await axios.get(`${BASE_URL}/report/pipeline`);
      const agentRes = await axios.get(`${BASE_URL}/report/closed-by-agent`);
      const statusRes = await axios.get(
        `${BASE_URL}/report/status-distribution`
      );

      setPipelineData([
        { name: "Closed", value: agentRes.data.totalClosed },
        { name: "Pipeline", value: pipelineRes.data.totalLeadsInPipeline },
      ]);

      setAgentData(agentRes.data.byAgent);
      setStatusData(statusRes.data.byStatus);
    } catch (err) {
      console.error("Error fetching reports:", err);
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

      {/* Main Report Section */}
      <main className="main-div">
        <h1 className="main-top">Report Overview</h1>

        {/* Total Leads Closed & In Pipeline */}
        <div className="chart-section">
          <h2>Total Leads Closed & In Pipeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pipelineData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pipelineData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Leads Closed by Sales Agent */}
        <div className="chart-section">
          <h2>Leads Closed by Sales Agent</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agentData}>
              <XAxis dataKey="agent" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Status Distribution */}
        <div className="chart-section">
          <h2>Lead Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="count"
                nameKey="status"
                outerRadius={100}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Reports;
