# Connect API Documentation

Welcome to the Connect API documentation! This directory contains comprehensive documentation for all API endpoints in the Connect platform, which connects job seekers with employers.

## Documentation Structure

The API documentation is organized into the following files:

1. [01_authentication.md](01_authentication.md) - User authentication and registration
2. [02_users.md](02_users.md) - User account management
3. [03_job_posts.md](03_job_posts.md) - Job postings management
4. [04_offers.md](04_offers.md) - Job offers management
5. [05_applications.md](05_applications.md) - Job applications management
6. [06_profiles.md](06_profiles.md) - User profiles (both employer and job seeker)

## Authentication

Most endpoints require authentication. Include the session cookie in your requests after logging in.

## Base URL

All API endpoints are relative to the base URL of your Connect API deployment.

## Response Format

All API responses are in JSON format.

## Error Handling

Errors are returned with appropriate HTTP status codes and a JSON object containing error details.

## Rate Limiting

API rate limiting may be implemented in the future. Check response headers for rate limit information.

## Support

For support, please contact the development team or refer to the project's main documentation.
