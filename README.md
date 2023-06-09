<div id="top"></div>

<div align="center">
  <img src="https://www.frontendmentor.io/static/images/logo-mobile.svg" alt="frontendmentor" width="80">

  <h2 align="center">Product feedback app</h2>
  <p align="center">
    <a href="https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6" target="_blank"><strong>Frontend Mentor Challenge</strong></a>
    <br />
    <br />
    <a href="https://product-feedback-client.onrender.com/#/auth/signin">View Demo</a>
    ·
    <a href="https://github.com/hector535/product-feedback-app/issues" target="_blank">Report Bug</a>
    <br />
    <br />
  </p>
</div>

<!-- Bagdes -->
<div align="center">
  <!-- Profile -->
  <a href="https://www.frontendmentor.io/profile/hector535" target="_blank">
    <img src="https://img.shields.io/badge/Profile-Héctor%20Figuereo-76b5c5?style=for-the-badge&logo=frontendmentor" alt="Héctor Figuereo">
  </a>
  <!-- Status -->
  <a href="#">
    <img src="https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge" alt="Status Completed">
  </a>

</div>

#

<div align="center">

![](./design/preview.jpg)

</div>

This is a solution to the [Product feedback app](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6) challenge on Frontend Mentor. Frontend Mentor challenges help you improve your coding skills by building realistic projects.

<h2 align="center">Links</h2>

- Solution URL: [Product Fedback App | Full Stack (PERN) | Frontend Mentor](https://www.frontendmentor.io/solutions/product-feedback-app-full-stack-in-progress-SN70KVTMfi)
- Live Site URL: [https://product-feedback-client.onrender.com/#/auth/signin](https://product-feedback-client.onrender.com/#/auth/signin)

<br>

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Your users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete product feedback requests
- Receive form validations when trying to create/edit feedback requests
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a product feedback request
- Upvote product feedback requests
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

### Expected behaviour

- Suggestions page
  - Only product feedback requests with a status of `suggestion` should be shown on the Suggestions page.
- Roadmap
  - Feedback requests with a status of `planned`, `in-progress`, or `live` should show up on the roadmap, and should be placed in the correct column based on their status.
  - Columns should be ordered by upvote totals.
- Creating a product request
  - When creating a new piece of feedback, an ID needs to be assigned which increments the current highest product request ID by 1.
  - The default status for a new piece of feedback is `suggestion`. This places it on the Suggestions page.
- Editing feedback
  - If a piece of feedback has its status updated to `planned`/`in-progress`/`live` it moves through to the roadmap and should show up in the correct column based on its new status.
- Add comments/replies
  - Use the data from the `currentUser` object in the `data.json` file to populate the user data for any new comments or replies.
  - Any comment/reply can have a maximum of 250 characters.

## My process

### Built with

#### Front-end

- React.js
- TypeScript
- React-Router-DOM
- React-Hook-Form
- React-Query
- Zustand
- Zod
- Tailwinds

#### Back-end

- Node.js
- TypeScript
- Express.js
- Mikro-ORM
- Zod

#### Database

- PostgreSQL

### Useful resources

- [React](https://reactjs.org/docs/getting-started.html)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [React Router](https://reactrouter.com/en/main)
- [React Hook Form](https://react-hook-form.com/get-started)
- [React-Query](https://tanstack.com/query/latest/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Zod](https://zod.dev/?id=arrays)
- [Tailwinds](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/en/starter/installing.html)
- [Mikro-ORM](https://mikro-orm.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Author

- Frontend Mentor - [@hector535](https://www.frontendmentor.io/profile/hector535)
