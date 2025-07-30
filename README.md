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
- Add new leads.

**List Leads**

- See all the leads name and delete them.

**Reports**

- See report/pie chart based on lead status.
- See bar chart for agents and their closed leads.

---

## API References

### **POST /api/leads**

Add New Lead
Sample Response:

```
[{_id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt}]
```

### **GET /api/leads**

Get all leads.
Sample Response:

```
[{_id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt}]
```

### **PUT /api/leads/:id**

Update a lead.
Sample Response:

```
[{_id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt}]
```

### **DELETE /api/leads/:id**

Delete a lead.
Sample Response:

```
[{"message": "Lead deleted successfully."}]
```

---

## Contact

For bugs or feature request, Please react out to pawanmishra196@gmail.com
