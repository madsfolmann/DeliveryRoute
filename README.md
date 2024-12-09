# DeliveryRoute

A web application for optimizing delivery routes using Google Maps APIs. This project includes a backend built with ASP.NET Core and a frontend built with React and TypeScript.

---

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

1. Install **Node.js**: [Download Node.js](https://nodejs.org/)
2. Install **.NET 8 SDK**: [Download .NET](https://dotnet.microsoft.com/download)

---

## Google Cloud Setup

1. **Create a Google Cloud Project**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project (e.g., `DeliveryRoute`).

2. **Enable Required APIs**:
   Enable the following APIs in your project:
   - [Maps JavaScript API](https://console.cloud.google.com/marketplace/product/google/maps-backend.googleapis.com)
   - [Routes API](https://console.cloud.google.com/marketplace/product/google/routes.googleapis.com)
   - [Places API](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)

3. **Create an API Key**:
   - Navigate to `APIs & Services` > `Credentials` in the Google Cloud Console.
   - Generate a new API Key and restrict it to the above APIs.

4. **Configuration**:
   - Add the API Key to the backend:
     - Open `appsettings.json` and update the `GoogleApiKey` value:
       ```json
       {
         "GoogleApiKey": "YOUR_GOOGLE_API_KEY"
       }
       ```
   - Add the API Key to the frontend:
     - Create a `.env` file in the `DeliveryRouteApp` folder:
       ```env
       REACT_APP_GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
       REACT_APP_BACKEND_URL="http://localhost:5241/api"
       ```

---

## Backend Setup

1. **Navigate to the Backend**:
   ```bash
   cd DeliveryRoute/Backend/DeliveryRouteAPI
   ```
2. **Restore Dependencies**:
   ```bash
   dotnet restore
   ```
3. **Run the Application**:
   ```bash
   dotnet run
   ```
   The backend API will be available at http://localhost:5241/api

---

## Frontend Setup

1. **Navigate to the Frontend**:
   ```bash
   cd DeliveryRoute/Frontend/DeliveryRouteApp
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the Frontend Application**:
   ```bash
   npm start
   # or
   yarn start
   ```
   The frontend will be available at http://localhost:3000

---

## Good luck! 🚀
