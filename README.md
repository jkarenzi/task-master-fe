# TaskMaster API

[![CI for TaskMaster Project](https://github.com/jkarenzi/task-master-be/actions/workflows/CI.yaml/badge.svg)](https://github.com/jkarenzi/task-master-fe/actions/workflows/CI.yaml)

[![codecov](https://codecov.io/gh/jkarenzi/task-master-fe/graph/badge.svg?token=bkqMEzJhjR)](https://codecov.io/gh/jkarenzi/task-master-fe)

## Overview

Welcome to TaskMaster! This project provides the frontend for the TaskMaster application. It is a robust task manager that allows users to create, update, style and delete their tasks

## Installation

To get started with the TaskMaster frontend project, follow these simple steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/jkarenzi/task-master-fe.git
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

## Testing

- Run tests

  ```bash
  npm run test
  ```

- Run tests with coverage

  ```bash
  npm run test:ci
  ```

## Docker

- Build the container

  ```bash
  docker build -t <image-name> .
  ```

- Run the container

  ```bash
  docker run -p <port>:<port> <image-name> .
  ```

## Authors

- [Manzi Karenzi](https://github.com/jkarenzi)
