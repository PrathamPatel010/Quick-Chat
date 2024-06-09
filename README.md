## Objective:
The goal is to develop a full-stack web-based messaging platform exclusive to college students. Goal is to provide college students to chat anonymously with other students within the college. This platform will facilitate anonymous and real-time communication, ensuring privacy and security. The system will be designed to be maintainable and scalable to accommodate the growing user base.

### Functional Requirements:
<i><u>Note:[V2] - Denotes that these features are for future enhancement.</i></u>
- Users should be able to register and log in using their college email addresses to maintain exclusivity.
- During signup, user should be able to provide their name, email, and password. Optionally, users can upload their profile picture.
- Users should be able to engage in real-time messaging using socket.io for immediate message updates.
- Users should see a typing indicator when the person they are chatting with is typing.
- Each user should be able to view each other's profile picture.
- Users should receive notifications for new messages.
- Users should have the ability to create group conversations through group chat functionality.
- Only Users with admin rights should be able to add new people to the group, remove people from the group, and change the name of the group.
  by default the person who creates the group will be admin.
- User credentials (i.e., passwords) should be stored in a hashed form using Argon2 to ensure security.
- [V2] All the messages should be end-to-end encrypted. All messages in the database should be encrypted.
- [V2] User should be able to sent attachment.

### Non-Functional Requirements:
- **Scalability:** The system should be capable of scaling to handle increased traffic as the user base grows.
- **Security:** Implement robust security measures to protect user data and communication.
- **Performance:** Ensure the system handles real-time data efficiently without delays.
- **Usability:** User interface should be clean and intuitive, using Tailwind CSS for styling.

### Capacity Estimation:
- **Storage:** Initial setup to handle data for up to 10,000 users with scope for expansion.
- **Traffic:** System designed to handle up to 1000 concurrent users initially with the ability to scale.

### Choosing Database
- Based on our requirements for flexibility in data structures and the need for easier scalability, MongoDB with Prisma could indeed be a better choice. 
Additionally, its support for horizontal scaling through sharding can help manage increased loads effectively as your application grows.


### Tech Stack:
- **Backend:** Node.js and Express.js
- **Database:** MongoDB with Prisma ORM
- **Real-time communication:** Socket.io
- **Frontend:** Next.js
- **Styling:** Tailwind CSS

### High Level Design Diagram
![Design Diagram.png](Design_Diagram.png)