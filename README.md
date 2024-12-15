
# **Job Application Tracker**

A full-stack web application to manage and track job applications effectively. This project allows users to log application details, update statuses, and synchronize data seamlessly with Google Sheets for added flexibility and collaboration.

---

## **Features**

- **Application Management**:
  - Add, edit, and delete job applications with ease.
  - Track application details such as company name, job title, application date, and current status.

- **Dynamic Status Updates**:
  - Update application statuses (e.g., Applied, Interview, Offer, Denied/Rejected).
  - Visual indicators (e.g., red borders) for "Denied/Rejected" applications using **TailwindCSS**.

- **Google Sheets Integration**:
  - Synchronize application data between the app and Google Sheets using the Google Sheets API.
  - Supports full data sync (MongoDB ↔ Google Sheets).

- **RESTful API**:
  - Full CRUD functionality with robust backend routes for managing applications.
  - Built with **Node.js**, **Express**, and **MongoDB**.

---

## **Technologies Used**

### **Frontend**
- **React**: Dynamic user interface and state management.
- **TailwindCSS**: Modern utility-first styling for a responsive and user-friendly design.

### **Backend**
- **Node.js**: Server-side runtime.
- **Express.js**: Lightweight framework for building RESTful APIs.
- **MongoDB**: NoSQL database for scalable and efficient data storage.

### **Integration**
- **Google Sheets API**: Sync data between MongoDB and Google Sheets for enhanced flexibility.

---

## **Setup Instructions**

### **Prerequisites**
- Node.js installed on your machine
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- Google Cloud account with Google Sheets API enabled

---

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/job-application-tracker.git
   cd job-application-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the project root with the following variables:
     ```env
     PORT=5000
     MONGO_URI=your-mongodb-connection-string
     SPREADSHEET_ID=your-google-sheet-id
     GOOGLE_APPLICATION_CREDENTIALS=path-to-service-account.json
     ```

4. **Run the server**:
   ```bash
   npm start
   ```

5. **Start the frontend**:
   - Navigate to the `client` directory and start the React app:
     ```bash
     cd client
     npm start
     ```

---

## **Usage**

1. Open the app in your browser at `http://localhost:3000`.
2. Use the **"Add Application"** form to log job applications.
3. Update application statuses using the dropdown menu.
4. Sync data to Google Sheets using the **"Sync to Sheets"** button.
5. Sync data from Google Sheets using the **"Sync from Sheets"** button.

---

## **API Endpoints**

### **Applications API**
| Method | Endpoint                      | Description                         |
|--------|-------------------------------|-------------------------------------|
| GET    | `/api/applications`           | Fetch all applications              |
| POST   | `/api/applications`           | Add a new application               |
| PUT    | `/api/applications/:id`       | Update an application by ID         |
| DELETE | `/api/applications/:id`       | Delete an application by ID         |

### **Google Sheets API**
| Method | Endpoint                      | Description                         |
|--------|-------------------------------|-------------------------------------|
| GET    | `/api/applications/sync-to-sheets`   | Sync MongoDB data to Google Sheets  |
| GET    | `/api/applications/sync-from-sheets` | Sync Google Sheets data to MongoDB  |

---

## **Contributing**

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m "Add some feature"`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Acknowledgments**

- [MongoDB](https://www.mongodb.com/) for NoSQL database.
- [Google Sheets API](https://developers.google.com/sheets) for seamless data integration.
- [React](https://reactjs.org/) and [TailwindCSS](https://tailwindcss.com/) for a modern frontend stack.

---
