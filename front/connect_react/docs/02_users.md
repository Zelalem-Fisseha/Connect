# Users API Documentation

This document outlines the user management endpoints for the Connect API.

## Table of Contents
- [List All Users](#list-all-users)
- [Get User by ID](#get-user-by-id)
- [Create User](#create-user)
- [Update User](#update-user)
- [Delete User](#delete-user)

---

## List All Users

Retrieves a list of all users in the system.

**Endpoint:** `GET /users`

### Request

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (admin only)

### Response

#### Success (200 OK)
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": 0,
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": 1,
    "created_at": "2023-01-02T00:00:00.000Z",
    "updated_at": "2023-01-02T00:00:00.000Z"
  }
]
```

---

## Get User by ID

Retrieves details of a specific user.

**Endpoint:** `GET /users/:id`

### Path Parameters
- `id` (required): The ID of the user to retrieve

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present

### Response

#### Success (200 OK)
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": 0,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

#### Error (404 Not Found)
```json
{
  "error": "Couldn't find User with 'id'=999"
}
```

---

## Create User

Creates a new user account. (Note: This is the same as the `/register` endpoint but follows REST conventions)

**Endpoint:** `POST /users`

### Request

#### Headers
- `Content-Type: application/json`

#### Body Parameters
```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "role": 0
  }
}
```

### Response

#### Success (201 Created)
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": 0,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

#### Error (422 Unprocessable Entity)
```json
{
  "errors": {
    "email": ["has already been taken"],
    "password_confirmation": ["doesn't match Password"],
    "role": ["can't be blank"]
  }
}
```

---

## Update User

Updates an existing user's information.

**Endpoint:** `PATCH /users/:id`

### Path Parameters
- `id` (required): The ID of the user to update

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (user can only update their own profile)

#### Body Parameters
```json
{
  "user": {
    "name": "Updated Name",
    "email": "updated@example.com",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
  }
}
```

### Response

#### Success (200 OK)
```json
{
  "id": 1,
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": 0,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-02T00:00:00.000Z"
}
```

#### Error (422 Unprocessable Entity)
```json
{
  "errors": {
    "email": ["has already been taken"]
  }
}
```

---

## Delete User

Deletes a user account and all associated data.

**Endpoint:** `DELETE /users/:id`

### Path Parameters
- `id` (required): The ID of the user to delete

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (user can only delete their own account or admin)

### Response

#### Success (204 No Content)
No content is returned.

#### Error (404 Not Found)
```json
{
  "error": "Couldn't find User with 'id'=999"
}
```

## User Roles

- `0`: Job Seeker
- `1`: Employer
