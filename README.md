# Trello Clone

This is a MERN (MongoDB, Express.js, React, Node.js) stack project created for my portfolio.
Its primary purpose is to refresh learned material and demonstrate full-stack development skills.

## Project Overview

(Optional: You can add a brief sentence or two here later about what the app does, e.g., "This application aims to replicate core functionalities of Trello, allowing users to create boards, lists, and cards.")

## Technologies Used

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other:** (e.g., Axios for API calls, Mongoose for MongoDB ODM)

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (LTS version recommended)
- npm (Node Package Manager) or Yarn
- MongoDB instance (local or cloud-hosted like MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/nigelnix/trello-clone.git](https://github.com/nigelnix/trello-clone.git)
    cd trello-clone
    ```
2.  **Backend Setup:**
    ```bash
    cd server
    npm install
    # Create a .env file in the server directory with your MongoDB URI
    # Example: MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/trello-db
    npm start # Or npm run dev if you have a dev script (e.g., with nodemon)
    ```
3.  **Frontend Setup:**
    ```bash
    cd ../client
    npm install
    # If your frontend needs to know your backend URL (e.g., for development)
    # create a .env file in the client directory
    # Example: VITE_API_BASE_URL=http://localhost:5000 (or whatever your backend runs on)
    npm run dev # Or npm start, depending on your Vite scripts
    ```

## Deployment

This application is designed for separate deployments:

- **Frontend:** Hosted on Netlify
- **Backend:** Hosted on Render

(Optional: You can add links to your live deployments here once they are set up)

## Contact

(Optional: Add your LinkedIn, GitHub profile link, or email here)
