# Grouper

Grouper is a web application designed for **streamlining group project coordination and enhancing team-based learning for students**. It provides a centralized platform for group collaboration, scheduling, and project management, built with a client-server architecture.

## Key Features
* **Shared Calendars:** Allow group members to schedule meetings, set deadlines, and view shared availability.
* **Task Management:** Create, assign, and track the progress of project tasks.
* **Real-time Chat:** Facilitate instant communication within groups.
* **File Sharing:** Easily share and manage project-related documents.
* **Group & Server Creation:** Users can create and join different servers (e.g., for different courses or clubs) and form specific groups within those servers.

## Prerequisites

Before you begin, ensure you have the following installed:

* Node.js
* npm (Node Package Manager)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.
1.  **Clone the Repository**

    Clone this repository to your computer:

    ```bash
    git clone <your-repository-url>
    cd <repository-folder-name>
    ```

2.  **Server Setup**

    Navigate to the server directory and install the necessary dependencies:

    ```bash
    cd servers
    npm i ws
    ```

    Then, to start the server:

    ```bash
    node ./index.js
    ```

3.  **Client Setup**

    Navigate to the client directory and install its dependencies:

    ```bash
    cd ../client
    npm install react-scripts react-select react-router-dom react-big-calendar multiselect-react-dropdown react-datepicker date-fns --save
    npm i --save axios
    ```


4.  **Running the Application**

    Once the server is running, start the client application:

    ```bash
    npm start
    ```
