# Humble Superhero API

This API allows users to add and retrieve a list of superheroes, sorted by their humility score.  It's built using NestJS and uses an in-memory store for superhero data.

## Features

*   **Add Superhero:**  POST endpoint to add a new superhero with their name, superpower, and humility score.
*   **Get Superheroes:** GET endpoint to retrieve a list of superheroes sorted by humility score (highest to lowest).

## Technologies Used

*   NestJS (Node.js framework)
*   Class-validator (for request body validation)
*   Jest (for testing)

## Installation

1.  Clone the repository: `git clone <repository_url>`
2.  Navigate to the project directory: `cd <project_directory>`
3.  Install dependencies: `npm install`

## Running the API

1.  Start the development server: `npm run start:dev`
2.  The API will be available at `http://localhost:3000` (or the port specified in your `main.ts` file).

## API Endpoints

### POST /superheroes

Adds a new superhero.

**Request Body (JSON):**

```json
{
  "name": "Captain Humility",
  "superpower": "Super Kindness",
  "humilityScore": 10
}
