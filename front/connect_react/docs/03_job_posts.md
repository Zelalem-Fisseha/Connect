# Job Posts API Documentation

This document outlines the job post management endpoints for the Connect API.

## Table of Contents
- [List All Job Posts](#list-all-job-posts)
- [Get Job Post by ID](#get-job-post-by-id)
- [Create Job Post](#create-job-post)
- [Update Job Post](#update-job-post)
- [Delete Job Post](#delete-job-post)
- [Job Types](#job-types)

---

## List All Job Posts

Retrieves a list of all job posts in the system.

**Endpoint:** `GET /job_posts`

### Request

#### Headers
- `Content-Type: application/json`

### Response

#### Success (200 OK)
```json
[
  {
    "id": 1,
    "employer_profile_id": 1,
    "description": "We are looking for a skilled developer...",
    "required_skills": "Ruby on Rails, React, PostgreSQL",
    "salary_min": 80000,
    "salary_max": 120000,
    "job_type": 0,
    "location": "Remote",
    "application_deadline": "2023-12-31T23:59:59.999Z",
    "is_active": true,
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  }
]
```

---

## Get Job Post by ID

Retrieves details of a specific job post.

**Endpoint:** `GET /job_posts/:id`

### Path Parameters
- `id` (required): The ID of the job post to retrieve

#### Headers
- `Content-Type: application/json`

### Response

#### Success (200 OK)
```json
{
  "id": 1,
  "employer_profile_id": 1,
  "description": "We are looking for a skilled developer...",
  "required_skills": "Ruby on Rails, React, PostgreSQL",
  "salary_min": 80000,
  "salary_max": 120000,
  "job_type": 0,
  "location": "Remote",
  "application_deadline": "2023-12-31T23:59:59.999Z",
  "is_active": true,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

#### Error (404 Not Found)
```json
{
  "error": "Job post not found"
}
```

---

## Create Job Post

Creates a new job post. Only employers can create job posts.

**Endpoint:** `POST /job_posts`

### Request

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (employer only)

#### Body Parameters
```json
{
  "job_post": {
    "employer_profile_id": 1,
    "description": "We are looking for a skilled developer...",
    "required_skills": "Ruby on Rails, React, PostgreSQL",
    "salary_min": 80000,
    "salary_max": 120000,
    "job_type": 0,
    "location": "Remote",
    "application_deadline": "2023-12-31T23:59:59.999Z",
    "is_active": true
  }
}
```

### Response

#### Success (201 Created)
```json
{
  "id": 1,
  "employer_profile_id": 1,
  "description": "We are looking for a skilled developer...",
  "required_skills": "Ruby on Rails, React, PostgreSQL",
  "salary_min": 80000,
  "salary_max": 120000,
  "job_type": 0,
  "location": "Remote",
  "application_deadline": "2023-12-31T23:59:59.999Z",
  "is_active": true,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

#### Error (422 Unprocessable Entity)
```json
{
  "errors": {
    "description": ["can't be blank"],
    "required_skills": ["can't be blank"],
    "salary_min": ["is not a number"],
    "job_type": ["can't be blank"],
    "location": ["can't be blank"],
    "application_deadline": ["can't be blank"],
    "is_active": ["is not included in the list"]
  }
}
```

---

## Update Job Post

Updates an existing job post. Only the employer who created the post can update it.

**Endpoint:** `PATCH /job_posts/:id`

### Path Parameters
- `id` (required): The ID of the job post to update

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (employer only)

#### Body Parameters
```json
{
  "job_post": {
    "description": "Updated job description...",
    "salary_max": 130000,
    "is_active": false
  }
}
```

### Response

#### Success (200 OK)
```json
{
  "id": 1,
  "employer_profile_id": 1,
  "description": "Updated job description...",
  "required_skills": "Ruby on Rails, React, PostgreSQL",
  "salary_min": 80000,
  "salary_max": 130000,
  "job_type": 0,
  "location": "Remote",
  "application_deadline": "2023-12-31T23:59:59.999Z",
  "is_active": false,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-02T00:00:00.000Z"
}
```

---

## Delete Job Post

Deletes a job post. Only the employer who created the post can delete it.

**Endpoint:** `DELETE /job_posts/:id`

### Path Parameters
- `id` (required): The ID of the job post to delete

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (employer only)

### Response

#### Success (204 No Content)
No content is returned.

#### Error (404 Not Found)
```json
{
  "error": "Job post not found"
}
```

## Job Types

- `0`: Full Time
- `1`: Part Time
