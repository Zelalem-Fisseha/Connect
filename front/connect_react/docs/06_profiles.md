# Profiles API Documentation

This document outlines the profile management endpoints for the Connect API, covering both employer and job seeker profiles.

## Table of Contents
- [Employer Profiles](#employer-profiles)
  - [Get Employer Profile](#get-employer-profile)
  - [Create Employer Profile](#create-employer-profile)
  - [Update Employer Profile](#update-employer-profile)
  - [Delete Employer Profile](#delete-employer-profile)
- [Job Seeker Profiles](#job-seeker-profiles)
  - [Get Job Seeker Profile](#get-job-seeker-profile)
  - [Create Job Seeker Profile](#create-job-seeker-profile)
  - [Update Job Seeker Profile](#update-job-seeker-profile)
  - [Delete Job Seeker Profile](#delete-job-seeker-profile)

---

## Employer Profiles

### Get Employer Profile

Retrieves the profile of a specific employer.

**Endpoint:** `GET /users/:user_id/employer_profile`

#### Path Parameters
- `user_id` (required): The ID of the user whose employer profile to retrieve

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present

### Response

#### Success (200 OK)
```json
{
  "id": 1,
  "user_id": 1,
  "company_name": "Tech Solutions Inc.",
  "company_description": "A leading technology company...",
  "industry": "Information Technology",
  "location": "San Francisco, CA",
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

#### Error (404 Not Found)
```json
{
  "error": "Employer profile not found"
}
```

---

### Create Employer Profile

Creates a new employer profile for a user.

**Endpoint:** `POST /users/:user_id/employer_profile`

#### Path Parameters
- `user_id` (required): The ID of the user to create the employer profile for

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (user must own the profile or be an admin)

#### Body Parameters
```json
{
  "employer_profile": {
    "company_name": "Tech Solutions Inc.",
    "company_description": "A leading technology company...",
    "industry": "Information Technology",
    "location": "San Francisco, CA"
  }
}
```

### Response

#### Success (201 Created)
```json
{
  "id": 1,
  "user_id": 1,
  "company_name": "Tech Solutions Inc.",
  "company_description": "A leading technology company...",
  "industry": "Information Technology",
  "location": "San Francisco, CA",
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

#### Error (422 Unprocessable Entity)
```json
{
  "errors": {
    "company_name": ["can't be blank"],
    "industry": ["can't be blank"]
  }
}
```

---

### Update Employer Profile

Updates an existing employer profile.

**Endpoint:** `PATCH /users/:user_id/employer_profile`

#### Path Parameters
- `user_id` (required): The ID of the user whose employer profile to update

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (user must own the profile or be an admin)

#### Body Parameters
```json
{
  "employer_profile": {
    "company_description": "Updated company description...",
    "location": "New York, NY"
  }
}
```

### Response

#### Success (200 OK)
```json
{
  "id": 1,
  "user_id": 1,
  "company_name": "Tech Solutions Inc.",
  "company_description": "Updated company description...",
  "industry": "Information Technology",
  "location": "New York, NY",
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-02T00:00:00.000Z"
}
```

---

### Delete Employer Profile

Deletes an employer profile.

**Endpoint:** `DELETE /users/:user_id/employer_profile`

#### Path Parameters
- `user_id` (required): The ID of the user whose employer profile to delete

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (user must own the profile or be an admin)

### Response

#### Success (204 No Content)
No content is returned.

---

## Job Seeker Profiles

### Get Job Seeker Profile

Retrieves the profile of a specific job seeker.

**Endpoint:** `GET /users/:user_id/job_seeker_profile`

#### Path Parameters
- `user_id` (required): The ID of the user whose job seeker profile to retrieve

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present

### Response

#### Success (200 OK)
```json
{
  "id": 2,
  "user_id": 2,
  "title": "Senior Software Engineer",
  "bio": "Experienced full-stack developer...",
  "years_of_experience": 5,
  "skills": "Ruby on Rails, React, PostgreSQL",
  "availability_status": "available",
  "portfolio_url": "https://example.com/portfolio",
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

#### Error (404 Not Found)
```json
{
  "error": "Job seeker profile not found"
}
```

---

### Create Job Seeker Profile

Creates a new job seeker profile for a user.

**Endpoint:** `POST /users/:user_id/job_seeker_profile`

#### Path Parameters
- `user_id` (required): The ID of the user to create the job seeker profile for

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (user must own the profile or be an admin)

#### Body Parameters
```json
{
  "job_seeker_profile": {
    "title": "Senior Software Engineer",
    "bio": "Experienced full-stack developer...",
    "years_of_experience": 5,
    "skills": "Ruby on Rails, React, PostgreSQL",
    "availability_status": "available",
    "portfolio_url": "https://example.com/portfolio"
  }
}
```

### Response

#### Success (201 Created)
```json
{
  "id": 2,
  "user_id": 2,
  "title": "Senior Software Engineer",
  "bio": "Experienced full-stack developer...",
  "years_of_experience": 5,
  "skills": "Ruby on Rails, React, PostgreSQL",
  "availability_status": "available",
  "portfolio_url": "https://example.com/portfolio",
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

---

### Update Job Seeker Profile

Updates an existing job seeker profile.

**Endpoint:** `PATCH /users/:user_id/job_seeker_profile`

#### Path Parameters
- `user_id` (required): The ID of the user whose job seeker profile to update

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (user must own the profile or be an admin)

#### Body Parameters
```json
{
  "job_seeker_profile": {
    "title": "Lead Software Engineer",
    "years_of_experience": 6,
    "availability_status": "not_available"
  }
}
```

### Response

#### Success (200 OK)
```json
{
  "id": 2,
  "user_id": 2,
  "title": "Lead Software Engineer",
  "bio": "Experienced full-stack developer...",
  "years_of_experience": 6,
  "skills": "Ruby on Rails, React, PostgreSQL",
  "availability_status": "not_available",
  "portfolio_url": "https://example.com/portfolio",
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-02T00:00:00.000Z"
}
```

---

### Delete Job Seeker Profile

Deletes a job seeker profile.

**Endpoint:** `DELETE /users/:user_id/job_seeker_profile`

#### Path Parameters
- `user_id` (required): The ID of the user whose job seeker profile to delete

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (user must own the profile or be an admin)

### Response

#### Success (204 No Content)
No content is returned.
