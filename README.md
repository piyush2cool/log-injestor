# Log Management System

## Table of Contents
- [Introduction](#introduction)
- [System Design](#system-design)
- [Features](#features)
- [Getting Started](#getting-started)
- [Identified Issues](#identified-issues)
- [License](#license)

## Introduction

The Log Management System is a web-based application that efficiently handles and queries log data. It consists of a Log Ingestor for receiving and storing logs and a Query Interface for searching and filtering logs.

## System Design

The Log Management System is designed as a microservices architecture with two main components: Log Ingestor and Query Interface.

### Log Ingestor:

**Responsibility:** Ingests log entries over HTTP, processes and stores them efficiently.

**Components:**
1. **HTTP Server:** Listens for log entries on port 3000.
2. **Log Processing:** Parses incoming log entries and stores them in an in-memory data structure.
3. **Scalable Storage:** Utilizes a distributed caching mechanism for handling a large volume of logs.

### Query Interface:

**Responsibility:** Provides a user interface for searching logs based on various filters.

**Components:**
1. **Web UI/CLI:** Offers a user-friendly interface for querying logs.
2. **Query Processing:** Accepts user queries, interprets them, and sends requests to the backend.
3. **Backend API:** Receives queries from the UI, processes them, and retrieves logs from the in-memory storage.
4. **Real-time Updates:** Implements real-time updates for log ingestion and search results.

### Technologies:

#### Log Ingestor:

- **Language:** Node.js (Express.js for HTTP server)

#### Query Interface:

- **Language:** Node.js (Express.js for backend, HTML/CSS/JavaScript for frontend)
- **Web Framework:** Express.js for building the backend API
- **Frontend Library:** HTML/CSS/Bootstrap for building a responsive and dynamic user interface.

### Interaction Flow:

#### Log Ingestion:

1. Logs are ingested over HTTP through the Log Ingestor's HTTP server.
2. The Log Ingestor processes and stores the logs in the in-memory data structure.

#### Querying Logs:

1. Users interact with the Query Interface through a web UI or CLI.
2. The Query Interface sends user queries to the backend API.
3. The backend processes the queries, retrieves logs from the in-memory storage, and sends the results back to the UI.
4. Real-time updates are pushed to the UI as new logs are ingested.

### Monitoring and Logging:

- Integrate logging mechanisms for both the Log Ingestor and Query Interface.
- Implement monitoring tools to full-text search across logs and apply various filters based on:
    - level
    - message
    - resourceId
    - timestamp
    - traceId
    - spanId
    - commit
    - metadata.parentResourceId.

## Features

- Log Ingestor:
  - Ingest logs over HTTP
  - Scalable storage using MongoDB
  - Real-time updates through WebSocket

- Query Interface:
  - User-friendly web UI for log queries
  - Full-text search and specific field filters
  - Real-time log updates
  - Support for date range searches

## Getting Started

### Prerequisites

- Node.js installed


### Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd log-management-system`
3. Install dependencies: `npm install`

### Log Ingestor

1. Start the Log Ingestor server: `npm run start-ingestor`
2. Logs can be ingested via HTTP at `http://localhost:3000/ingest`

### Query Interface

1. Run the query-interface1.html file

## Identified Issues

1. Security measures, including input validation and authentication not implemented.
2. The system is using cache memory but no external database like mongoDB.



## License

This project is licensed under the [MIT License](LICENSE).
