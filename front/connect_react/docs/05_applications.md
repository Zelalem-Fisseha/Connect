# Applications API Documentation

This document outlines the job application management endpoints for the Connect API.

## Table of Contents
- [List Applications for a Job Post](#list-applications-for-a-job-post)
- [Submit an Application](#submit-an-application)
- [Application Statuses](#application-statuses)

---

## List Applications for a Job Post

Retrieves all applications for a specific job post. Only accessible by the employer who created the job post.

**Endpoint:** `GET /job_posts/:job_post_id/applications`

### Path Parameters
- `job_post_id` (required): The ID of the job post

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (employer only)

### Response

#### Success (200 OK)
```json
[
  {
    "id": 1,
    "job_post_id": 1,
    "job_seeker_profile_id": 1,
    "cover_letter": "I am excited to apply for this position...",
    "status": 0,
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z",
    "job_seeker_profile": {
      "title": "Senior Software Engineer"
    }
  }
]
```

#### Error (404 Not Found)
```json
{
  "error": "Couldn't find JobPost with 'id'=999"
}
```

---

## Submit an Application

Submits a job application for a specific job post. Only job seekers can submit applications.

**Endpoint:** `POST /job_posts/:job_post_id/applications`

### Path Parameters
- `job_post_id` (required): The ID of the job post to apply to

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (job seeker only)

#### Body Parameters
```json
{
  "application": {
    "job_seeker_profile_id": 1,
    "cover_letter": "I am excited to apply for this position...",
    "status": 0
  }
}
```

### Response

#### Success (201 Created)
```json
{
  "id": 1,
  "job_post_id": 1,
  "job_seeker_profile_id": 1,
  "cover_letter": "I am excited to apply for this position...",
  "status": 0,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

#### Error (422 Unprocessable Entity)
```json
{
  "errors": {
    "job_seeker_profile": ["must exist"],
    "cover_letter": ["can't be blank"]
  }
}
```

## Application Statuses

- `0`: Pending - The application has been submitted but not yet reviewed
- `1`: Under Review - The application is being reviewed by the employer
- `2`: Shortlisted - The applicant has been shortlisted for the next round
- `3`: Rejected - The application has been rejected
- `4`: Hired - The applicant has been hired for the position

Note: The status field is currently not being updated in the controller but is part of the schema for future implementation.
