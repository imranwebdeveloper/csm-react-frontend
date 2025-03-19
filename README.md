# Content Management System

## Description

This project is a web application where registered users can create and manage their own publicly viewable content. While content can be viewed by all visitors, only the owner can edit their content.

## Video Demo : [Watch](https://drive.google.com/file/d/1H-j_nyGmt-hRjC0AxeRXa6KO8gLsrQJX/view?usp=drive_link)

## Features

- User authentication (login & registration)
- Profile management (view & edit profile details)
- Content management (add & edit YouTube embed links)
- Public user listing for visitors
- Form validation with Formik & Yup
- API integration with Axios & React Query
- UI components using ShadCN UI
- Role-based access control
- Secure authentication with JWT
- Responsive design with Tailwind CSS

## Technologies Used

- React.js
- TypeScript
- Context API
- React Query
- Formik & Yup
- Tailwind CSS
- ShadCN UI
- React Router

## Backend Dependency

This project depends on the backend repository available at:
[Backend Repository](https://github.com/imranwebdeveloper/csm-express-backend)

### Frontend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/imranwebdeveloper/csm-react-frontend.git
   cd csm-frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add the following environment variables:
     ```env
     VITE_API_BASE_URL=http://localhost:5000
     ```
4. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
