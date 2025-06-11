# QuickTask (Frontend)

## Overview

QuickTask is a responsive and intuitive task management web application designed for seamless organization of daily objectives. It provides a full suite of features for creating, managing, and tracking tasks. This repository contains the complete source code for the frontend client, built with React and TypeScript.

The backend service for this application is maintained in a separate repository. You can find the backend source code [here](https://github.com/nathanEvrardDaCunha/quickTasks_back).

**Live Demo:** https://quicktasks.up.railway.app/

---

## Key Features

The application implements a comprehensive set of features for a complete user experience.

### **Authentication & User Management**

-   Secure user registration and login functionality.
-   Password recovery via email.
-   Authenticated session management using JSON Web Tokens (JWT).
-   Ability for users to view, update, and delete their accounts.

### **Task Management**

-   A centralized dashboard to view all tasks.
-   Functionality to create, update, and delete tasks.
-   Option to mark tasks as "complete" to track progress.
-   Advanced sorting and filtering capabilities based on task properties (e.g., priority, deadline...).

### **User Interface & Experience**

-   A modern, clean, and mobile-first responsive design that ensures usability across all devices.
-   A user-selectable theme (light/dark mode) for improved accessibility and user comfort.
-   Interactive UI elements and smooth animations to enhance the user experience.
-   A dedicated contact page for user support inquiries.

---

## Technology Stack

This project was developed using a modern technology stack to ensure performance, scalability, and maintainability.

| Category             | Technology / Tool              |
| -------------------- | ------------------------------ |
| **Core**             | HTML5, CSS3, TypeScript, React |
| **Styling**          | SCSS/SASS                      |
| **State Management** | React Query (TanStack)         |
| **Routing**          | React Router                   |
| **Tooling**          | Vite, npm                      |
| **Deployment**       | Docker                         |

---

## Local Development Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nathanEvrardDaCunha/quickTasks_front.git
    cd quickTasks_front
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the necessary environment variables. You can use the `.env.example` file as a template.

    ```env
    VITE_API_URL=http://localhost:8000
    ```

    _Ensure the backend server is running and accessible at this URL._

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## Deployment

The application is configured for deployment on Railway. To deploy your own instance, follow these configuration adjustments:

1.  **Update the Content Security Policy (CSP):**
    In the `nginx.conf` file, modify the `connect-src` directive to include the URL of your deployed backend service.

    ```nginx
    # nginx.conf
    add_header Content-Security-Policy "default-src 'self'; connect-src 'self' https://your-backend-url.up.railway.app; ...";
    ```

2.  **Configure Environment Variables in Railway:**
    In your Railway project settings, set the `VITE_API_URL` environment variable to the public domain of your deployed backend.

3.  **Update the API Service Base URL:**
    Ensure the `baseURL` within your API service configuration points to the public domain of your backend.

    ```typescript
    // Example in an API service file
    constructor() {
        this.baseURL = 'https://your-backend-public-domain.com';
    }
    ```

---

## Project Retrospective & Key Learnings

This project served as a significant learning experience, providing practical insights into building a full-stack application. Below are some of the key challenges encountered and the lessons learned.

-   **Authentication Security:**

    -   **Challenge:** The initial authentication logic stored the user ID in `localStorage`, creating a potential security vulnerability where a user could manipulate it.
    -   **Solution:** The implementation was refactored to rely on the server-signed JWT. The user's identity is securely derived from the token on the backend for each authenticated request, ensuring data integrity.

-   **Component Architecture:**

    -   **Challenge:** Early reusable components were not designed with sufficient flexibility, lacking props for custom styling, which complicated layout adjustments.
    -   **Solution:** Components were refactored to accept a `style` or `className` prop, enabling developers to pass custom styles from parent components for better layout control without sacrificing the component's core structure.

-   **Code Modularity and Refactoring:**

    -   **Challenge:** As new features were added, certain components and logic files became overly large and difficult to maintain or extend.
    -   **Solution:** A significant refactoring effort was undertaken to modularize the codebase. Complex logic was extracted into reusable custom hooks and large components were broken down into smaller, single-purpose components. This greatly improved code readability and development velocity.

-   **Project Structure:**
    -   **Challenge:** The initial folder structure did not scale well, making it time-consuming to locate related files for a specific feature.
    -   **Solution:** The project was reorganized using a feature-based folder structure. Code related to a specific feature is now co-located, while global elements reside in dedicated folders at the source root.

---

## Conclusion

The development of QuickTask was instrumental in solidifying my understanding of modern frontend technologies and best practices. It provided hands-on experience in implementing critical features such as secure authentication, robust state management with React Query, and responsive, accessible UI design.

The challenges faced throughout the development lifecycle were invaluable, leading to a deeper appreciation for modular architecture, secure coding practices, and maintainable project structures. The skills acquired during this project have built a strong foundation for developing more secure, flexible, and efficient web applications in the future.
