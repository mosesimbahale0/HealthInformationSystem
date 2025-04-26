# Documentation 
## Stack
- Apollo GraphQL + Express 
- Firebase Auth
- MongoDB 
- Paypal


# Folder Structure
.
├── Dockerfile
├── env.example
├── package.json
├── public
├── README.md
├── src
│   ├── index.ts
│   ├── middlewares
│   ├── models
│   ├── resolvers
│   ├── schemas
│   ├── types
│   └── utils
└── tsconfig.json



# Project Overview: GraphQL API Server

This project is a GraphQL API server built with Apollo Server and Express, secured by Firebase Authentication, and backed by MongoDB for data persistence. It provides a scalable, modular foundation for building modern applications with type safety and developer-friendly tooling.

## Tech Stack

* **Apollo GraphQL + Express:** Handles GraphQL queries, mutations, and subscriptions, running on an Express.js server.
* **Firebase Auth:** Manages user authentication, allowing secure login, signup, and token validation.
* **MongoDB:** Serves as the primary NoSQL database, storing application data in flexible JSON-like documents.

## Prerequisites

Before getting started, ensure you have the following installed:

* Node.js (v14 or newer)
* Docker (optional, for containerized development)
* A Firebase project with Auth enabled
* A running MongoDB instance or MongoDB Atlas cluster

## Getting Started

Follow these steps to get the project running locally:

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```
    *(Replace `<repository-url>` with the actual URL of your repository and `<project-folder>` with the name of the cloned directory)*

2.  **Environment Variables**
    * Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    * Open the `.env` file and fill in your Firebase configuration, MongoDB URI, and any other required secrets:
        ```env
        PORT=4000
        MONGODB_URI=mongodb://localhost:27017/mydb # Replace with your MongoDB connection string
        FIREBASE_API_KEY=your_api_key
        FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
        FIREBASE_PROJECT_ID=your_project_id
        # Add other necessary variables
        ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```
    This command starts the server with hot reload enabled. You can access the GraphQL Playground at `http://localhost:4000/graphql`.

## Docker (Optional)

If you prefer using Docker for development:

1.  **Build the Container:**
    ```bash
    docker build -t graphql-server .
    ```

2.  **Run with Docker:**
    Make sure your `.env` file is configured correctly.
    ```bash
    docker run -d -p 4000:4000 --env-file .env graphql-server
    ```
    The server will be accessible at `http://localhost:4000/graphql`.

## Folder Structure

Markdown

# Project Overview: GraphQL API Server

This project is a GraphQL API server built with Apollo Server and Express, secured by Firebase Authentication, and backed by MongoDB for data persistence. It provides a scalable, modular foundation for building modern applications with type safety and developer-friendly tooling.

## Tech Stack

* **Apollo GraphQL + Express:** Handles GraphQL queries, mutations, and subscriptions, running on an Express.js server.
* **Firebase Auth:** Manages user authentication, allowing secure login, signup, and token validation.
* **MongoDB:** Serves as the primary NoSQL database, storing application data in flexible JSON-like documents.

## Prerequisites

Before getting started, ensure you have the following installed:

* Node.js (v14 or newer)
* Docker (optional, for containerized development)
* A Firebase project with Auth enabled
* A running MongoDB instance or MongoDB Atlas cluster

## Getting Started

Follow these steps to get the project running locally:

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```
    *(Replace `<repository-url>` with the actual URL of your repository and `<project-folder>` with the name of the cloned directory)*

2.  **Environment Variables**
    * Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    * Open the `.env` file and fill in your Firebase configuration, MongoDB URI, and any other required secrets:
        ```env
        PORT=4000
        MONGODB_URI=mongodb://localhost:27017/mydb # Replace with your MongoDB connection string
        FIREBASE_API_KEY=your_api_key
        FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
        FIREBASE_PROJECT_ID=your_project_id
        # Add other necessary variables
        ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```
    This command starts the server with hot reload enabled. You can access the GraphQL Playground at `http://localhost:4000/graphql`.

## Docker (Optional)

If you prefer using Docker for development:

1.  **Build the Container:**
    ```bash
    docker build -t graphql-server .
    ```

2.  **Run with Docker:**
    Make sure your `.env` file is configured correctly.
    ```bash
    docker run -d -p 4000:4000 --env-file .env graphql-server
    ```
    The server will be accessible at `http://localhost:4000/graphql`.

## Folder Structure

.
├── Dockerfile         # Docker build instructions
├── env.example        # Example environment variables
├── package.json       # NPM scripts and dependencies
├── public             # Static assets (if any)
├── README.md          # Project documentation
├── src
│   ├── index.ts       # Application entry point
│   ├── middlewares    # Express and auth middleware
│   ├── models         # Mongoose models
│   ├── resolvers      # GraphQL resolver functions
│   ├── schemas        # GraphQL schema definitions
│   ├── types          # TypeScript type declarations
│   └── utils          # Utility functions and helpers
└── tsconfig.json      # TypeScript configuration



* **`src/index.ts`**: Bootstraps the Express server with Apollo Server and applies middleware.
* **`src/middlewares/`**: Contains authentication, error-handling, and other request pipeline layers.
* **`src/models/`**: Defines MongoDB schemas and models using Mongoose.
* **`src/resolvers/`**: Implements the application logic for each GraphQL query, mutation, and subscription.
* **`src/schemas/`**: Contains GraphQL type definitions (`.graphql` files or SDL strings) and potentially schema stitching logic.
* **`src/types/`**: Shared TypeScript interfaces and type definitions used across the application.
* **`src/utils/`**: Helper functions for common tasks like token verification, logging, data formatting, etc.

## Usage

* Navigate to the **GraphQL Playground** at `http://localhost:4000/graphql` (or your configured host/port) in your browser.
* Explore the schema, write, and test GraphQL queries and mutations directly in the Playground.
* For authenticated operations, include an `Authorization` header with your Firebase ID token:
    ```
    Authorization: Bearer <your_firebase_id_token>
    ```

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -am 'feat: Add some amazing feature'`).
4.  Push your changes to the branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request against the main branch of the original repository.

Please ensure your code adheres to the project's coding standards and includes relevant tests if applicable.

## 🔨 Usage
Access GraphQL Playground at http://localhost:4000/graphql.

Authenticated Request Example:

graphql
```
mutation CreatePost {
  createPost(content: "Hello World") {
    id
    content
    author
  }
}
```

### headers
Authorization: Bearer <FIREBASE_ID_TOKEN>