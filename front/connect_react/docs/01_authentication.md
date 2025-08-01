# Authentication API Documentation

This document outlines the authentication endpoints for the Connect API.

## Table of Contents
- [Get CSRF Token](#get-csrf-token)
- [Login](#login)
- [Logout](#logout)
- [Get Current User](#get-current-user)
- [Register](#register)

---

## Get CSRF Token

Retrieves a CSRF token that should be included in subsequent requests that modify data (POST, PUT, PATCH, DELETE). The token should be included in the `X-CSRF-Token` header or as a parameter named `authenticity_token`.

**Endpoint:** `GET /csrf_token`

### Request

#### Headers
- `Content-Type: application/json`

### Response

#### Success (200 OK)
```json
{
  "csrf_token": "your-csrf-token-here"
}
```

### Usage Example

1. First, get a CSRF token:
   ```
   GET /csrf_token
   ```

2. Include the token in subsequent requests:
   ```
   POST /login
   X-CSRF-Token: your-csrf-token-here
   Content-Type: application/json
   
   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```

   or as a parameter:
   ```
   POST /login?authenticity_token=your-csrf-token-here
   Content-Type: application/json
   
   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```

---

## Login

Authenticates a user and creates a new session.

**Endpoint:** `POST /login`

### Request

#### Headers
- `Content-Type: application/json`

#### Body Parameters
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

#### Success (200 OK)
```json
{
  "message": "Logged in successfully",
  "role": "job_seeker"
}
```

#### Error (401 Unauthorized)
```json
{
  "error": "Invalid email or password"
}
```

---

## Logout

Terminates the current user's session.

**Endpoint:** `DELETE /logout`

### Request

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present

### Response

#### Success (200 OK)
```json
{
  "message": "Logged out successfully"
}
```

---

## Get Current User

Retrieves information about the currently authenticated user.

**Endpoint:** `GET /current_user`

### Request

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
  "role": "job_seeker"
}
```

#### Error (401 Unauthorized)
```json
{
  "error": "No user logged in"
}
```

---

## Register

Creates a new user account.

**Endpoint:** `POST /register`

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
    "role": "job_seeker"
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
  "role": "job_seeker"
}
```

#### Error (422 Unprocessable Entity)
```json
{
  "errors": {
    "email": ["has already been taken"],
    "password_confirmation": ["doesn't match Password"]
  }
}
```
