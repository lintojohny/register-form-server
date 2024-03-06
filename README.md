# Register Form Server

## Overview

This repository contains the server-side implementation for a user registration form. It utilizes Node.js (v18.8) and various tools for efficient functionality.

## Postman Documentation

Explore the detailed Postman documentation for API endpoints and usage: [Postman Documentation](https://documenter.getpostman.com/view/9968007/2sA2xe4ZX3#e1391cdc-b876-4b70-acd3-152514a1eab9)

## Setup Commands

1. Install dependencies:

    ```bash
    npm install
    ```

2. Run test cases:

    ```bash
    npm run test
    ```

3. Start the server:

    ```bash
    npm start
    ```

## Tools Used

- **Node.js:** v18.8
- **Yup:** Validation middleware
- **Jest:** Test framework
- **Mongoose:** Object-Document Mapper (ODM)
- **Mongoose In-Memory Database:** In-memory database

## JWT Token Handling

Upon successful user creation, a JWT token is generated, decrypted, and securely stored in the database.

