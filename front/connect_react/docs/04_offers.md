# Offers API Documentation

This document outlines the job offer management endpoints for the Connect API.

## Table of Contents
- [List Offers for a Job Post](#list-offers-for-a-job-post)
- [Create an Offer](#create-an-offer)
- [Get Offer Details](#get-offer-details)
- [Update an Offer](#update-an-offer)
- [Delete an Offer](#delete-an-offer)
- [Offer Statuses](#offer-statuses)

---

## List Offers for a Job Post

Retrieves all offers associated with a specific job post.

**Endpoint:** `GET /job_posts/:job_post_id/offers`

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
    "employer_profile_id": 1,
    "base_salary": 90000,
    "benefits_description": "Health insurance, 401k, flexible hours",
    "status": 0,
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  }
]
```

---

## Create an Offer

Creates a new job offer for a specific job post. Only employers can create offers.

**Endpoint:** `POST /job_posts/:job_post_id/offers`

### Path Parameters
- `job_post_id` (required): The ID of the job post to create an offer for

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (employer only)

#### Body Parameters
```json
{
  "offer": {
    "job_seeker_profile_id": 1,
    "employer_profile_id": 1,
    "base_salary": 90000,
    "benefits_description": "Health insurance, 401k, flexible hours",
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
  "employer_profile_id": 1,
  "base_salary": 90000,
  "benefits_description": "Health insurance, 401k, flexible hours",
  "status": 0,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

#### Error (422 Unprocessable Entity)
```json
{
  "errors": {
    "base_salary": ["can't be blank", "is not a number"],
    "benefits_description": ["can't be blank"],
    "status": ["can't be blank"]
  }
}
```

---

## Get Offer Details

Retrieves details of a specific offer.

**Endpoint:** `GET /offers/:id`

### Path Parameters
- `id` (required): The ID of the offer to retrieve

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (employer or job seeker involved in the offer)

### Response

#### Success (200 OK)
```json
{
  "id": 1,
  "job_post_id": 1,
  "job_seeker_profile_id": 1,
  "employer_profile_id": 1,
  "base_salary": 90000,
  "benefits_description": "Health insurance, 401k, flexible hours",
  "status": 0,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

#### Error (404 Not Found)
```json
{
  "error": "Couldn't find Offer with 'id'=999"
}
```

---

## Update an Offer

Updates an existing job offer. Typically used to update the offer status.

**Endpoint:** `PATCH /offers/:id`

### Path Parameters
- `id` (required): The ID of the offer to update

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (job seeker can only update status, employer may have additional permissions)

#### Body Parameters
```json
{
  "offer": {
    "status": 1
  }
}
```

### Response

#### Success (200 OK)
```json
{
  "id": 1,
  "job_post_id": 1,
  "job_seeker_profile_id": 1,
  "employer_profile_id": 1,
  "base_salary": 90000,
  "benefits_description": "Health insurance, 401k, flexible hours",
  "status": 1,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-02T00:00:00.000Z"
}
```

---

## Delete an Offer

Deletes a job offer. Only the employer who created the offer can delete it.

**Endpoint:** `DELETE /offers/:id`

### Path Parameters
- `id` (required): The ID of the offer to delete

#### Headers
- `Content-Type: application/json`
- `Cookie`: Session cookie must be present (employer only)

### Response

#### Success (204 No Content)
No content is returned.

#### Error (404 Not Found)
```json
{
  "error": "Couldn't find Offer with 'id'=999"
}
```

## Offer Statuses

- `0`: Pending - The offer has been made but not yet accepted or rejected
- `1`: Accepted - The job seeker has accepted the offer
- `2`: Rejected - The job seeker has rejected the offer
