# Anvaya CRM Tool

A Full Stack CRM tool where you can list, add, edit and delete leads. You can create and list salest agent. Also reports can be generated to visualize the leads status and agents managing them.
Built with react frontend, express/node backend, MongoDB.

---

## Demo Link

[Live Demo](https://anvaya-frontend-phi.vercel.app/)

---

## Quick Start

```
git clone https://github.com/pawanx/Anvaya-Frontend.git
cd Anvaya-Frontend
npm install
npm run dev

```

## Technologies

- React JS
- React router
- Node JS
- Express
- Mongo DB

---

## Demo Video

Watch a walk through (5 min) of all the major features of the app:
[Loom Video Link](https://www.loom.com/share/5b4062da480b42ee83e01b5af155f8eb?sid=0b81db55-f451-419e-961d-4166fbf461af)

---

## Features

**Home**

- See all the leads on homepage.
- "Add new lead" to add a new lead to the system.
- Quick filters to filter by lead status.

**List Leads**

- See all the leads name.
- "Delete" to delete the list from the system.
- Filter by status and agents and sort by prioroty and time to close.

**List Sales Agents**

- See all the agents name.
- Filter by lead status and priority.
- "Create new agent" to add new agents to DB.

**Reports**

- See report/pie chart based on lead status.
- See bar chart for agents and their closed leads.

---

## API References

### **POST /api/leads**

Add New Lead
Sample Response:

```
{
      _id: "334645",
      name: "Global Innovations Ltd.",
      source: "Cold Call",
      salesAgent: {
        _id: "6875e3162e47540f2f67c28f",
        name: "Bob Williams"
      },
      status: "Contacted",
      tags: [
        "Follow-up"
      ],
      timeToClose: 45,
      priority: "Medium",
      createdAt: "2025-07-15T15:11:04.101Z",
      updatedAt: "2025-07-15T15:11:04.112Z",
    }

```

### **GET /api/leads**

Get all leads.
Sample Response:

```
[
 {
      _id: "334645",
      name: "Global Innovations Ltd.",
      source: "Cold Call",
      salesAgent: {
        _id: "6875e3162e47540f2f67c28f",
        name: "Bob Williams"
      },
      status: "Contacted",
      tags: [
        "Follow-up"
      ],
      timeToClose: 45,
      priority: "Medium",
      createdAt: "2025-07-15T15:11:04.101Z",
      updatedAt: "2025-07-15T15:11:04.112Z",
    }
]
```

### **PUT /api/leads/:id**

Update a lead.
Sample Response:

```
 {
      _id: "334645",
      name: "Global Innovations Ltd.",
      source: "Cold Call",
      salesAgent: {
        _id: "6875e3162e47540f2f67c28f",
        name: "Bob Williams"
      },
      status: "Contacted",
      tags: [
        "Follow-up"
      ],
      timeToClose: 45,
      priority: "Medium",
      createdAt: "2025-07-15T15:11:04.101Z",
      updatedAt: "2025-07-15T15:11:04.112Z",
    }
```

### **DELETE /api/leads/:id**

Delete a lead.
Sample Response:

```
[{"message": "Lead deleted successfully."}]
```

### **POST /api/agents**

Add New Agent
Sample Response:

```
{
_id:12344,
name: "Bob",
email: 123@example.com,
createdAt: "2025-07-15T15:11:04.112Z"
}
```

### **GET /api/agents**

Get the Agents list.
Sample Response:

```
[{
_id: "2424",
name: "Hillman",
email: "gill@example.com"
}]
```

### **POST /api/comments**

Add New Comment
Sample Response:

```
[{
_id: "123123452",
commenttext: "Do followup",
author: "John Doe",
createdAt: "2025-07-15T15:11:04.112Z"
}]
```

### **GET /api/leads/:id/comments**

Get the comment list for a lead.
Sample Response:

```
[{
_id: "123123452",
commenttext: "Do followup",
author: "John Doe",
createdAt: "2025-07-15T15:11:04.112Z"
}]
```

### **GET /api/report/last-week**

Fetches all leads that were closed (status: Closed) in the last 7 days.
Sample Response:

```
[
{
_id: "124235",
name: "Dill Man",
salesAgents : "Jhnah": ,
closedAt : "2025-07-15T15:11:04.112Z"
}]
```

### **GET /api/report/pipeline**

Fetches the total number of leads currently in the pipeline (all statuses except Closed).
Sample Response:

```
{totalLeadsInPipeline}
```

---

## Contact

For bugs or feature request, Please react out to pawanmishra196@gmail.com
