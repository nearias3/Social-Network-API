# Social-Network-API

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Description

This repository contains the back-end API for a social networking site where users can add each other as friends, share their thoughts and react to each other's thoughts. It was built using Node.js, Express.js, MongoDB and Mongoose for handling the data. It allows users to perform the standard CRUD operations for users, thoughts, friends, and recations and follows RESTful principles. It was tested locally using Insomnia.

## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [License](#license)
  - [Contributing](#contributing)

  ## Installation
  
1. Clone the repository using `git clone`.

2. Install dependencies using `npm install`.
    
## Usage

1. (Optional) Set up dummy data for testing and seed it using `node seed.js`

2. Start the server through `npm start` or `node server.js`

3. Test the routes using Insomnia (or other API clients). See the [API Endpoints](#api-endpoints) section for more information. 

Here is the link to a [video walkthrough](https://drive.google.com/file/d/1-4YSClNn7XEwE-krPIUcDnMLFidm5TDx/view?usp=sharing).

![Screenshot of Endpoints in Insomnia](/images/API%20Endpoints.png)

 ## API Endpoints

 Here are the main API routes you can use to interact with the Social Network API.

### Users
- GET /api/users: Get all users
- GET /api/users/:userId: Get a single user by ID
- POST /api/users: Create a new user
- PUT /api/users/:userId: Update a user by ID
- DELETE /api/users/:userId: Delete a user by ID (and remove associated thoughts)

### Friends
- POST /api/users/:userId/friends/:friendId: Add a friend to the user's friend list
- DELETE /api/users/:userId/friends/:friendId: Remove a friend from the user's friend list

### Thoughts
- GET /api/thoughts: Get all thoughts
- GET /api/thoughts/:thoughtId: Get a single thought by ID
- POST /api/thoughts: Create a new thought (and push it to the user's thoughts array)
- PUT /api/thoughts/:thoughtId: Update a thought by ID
- DELETE /api/thoughts/:thoughtId: Delete a thought by ID

### Reactions
- POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought by its reactionId

## License
    
Please refer to the license in the repo.

## Contributing
  
Useful information about coding, including tutorials and guides as well as boilerplate code used, were provided by the UT Bootcamp GitLab: [https://git.bootcampcontent.com/University-of-Texas-at-Austin/UTA-VIRT-FSF-PT-05-2024-U-LOLC/].
    
I frequently referred to Mozilla's developer tool blogs (MDN Web Docs) for help identifying the correct code and syntax: [https://developer.mozilla.org/en].
  
I utilized helpful tips and tutorials from coding websites such as: [https://www.geeksforgeeks.org/], [https://coding-boot-camp.github.io], and [https://www.stackoverflow.com].