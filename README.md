# HEALTH INFORMATION SYSTEM (HIS)
#### A basic health information system for managing clients &amp; health programs/services

- Core Goal: Simulate a system to manage clients and health programs.
- User: A Doctor 



#### Key Entities:
1. Client: Represents a patient (needs ID, name, email, phone, DOB, etc.).
2. Program: Represents a health service (needs ID, name, description).
3. Enrollment: Represents the link between a Client and a Program (Many-to-Many relationship). - In a document based database(We can simply have a programs field and have an array of program Ids in the client document)



#### Key Actions:
- Create Program/Service
- Register Client
- Enroll Client in Program(s)
- Search Client
- View Client Profile (including enrollments)
- Expose Client Profile via API


# TECH STACK  
- NodeJs - Express  + Apollo GraphQL (Separation of concerns - Business Logic)
- Remix-run - SSR - Presentation Layer (ONLY)
- MongoDB - Flexibility

This is a performance-focused handcrafted variation of the MERN stack, aimed at enhancing user experience with speed and responsiveness. However, it may not be the most cost-effective option.

# RUN LOCALLY
# Clone the repository
git clone https://github.com/mosesimbahale0/HealthInformationSystem.git


# Server
#### Navigate to the server directory
cd HealthInformationSystem/server

#### Install dependencies
npm install

#### Create a .env file in the server directory and add the following:
#### MONGODB_URI=your_mongodb_connection_string

#### Start the server
npm run dev



# RUN LOCALLY WITH DOCKER & DOCKER COMPOSE
#### Create a .env file in the root directory and add the following:
```
MONGODB_URI=your_mongodb_connection_string
```
#### Build the docker images
```
docker compose build
```
#### Run the docker containers
```
docker compose up -d
```
#### Stop the docker containers
```
docker compose down
```
#### Run the docker containers with environment variables
```
docker compose --env-file .env up -d
```



# SECURITY CONSIDERATIONS
- Authentication and Authorization is ommited for simplicity & time constraints.
