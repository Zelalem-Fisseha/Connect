# Connect - Developer Job Platform

Connect is a full-stack web application that bridges the gap between software developers and employers. It provides a platform for developers to showcase their skills and for employers to post job opportunities and find the right talent.

## Features

### For Developers
- Create and manage your developer profile
- Showcase your skills and experience
- Browse and apply for job opportunities
- Track your job applications
- Connect with potential employers

### For Employers
- Post and manage job listings
- Browse developer profiles
- Review applications
- Connect with potential candidates
- Manage your company profile

## Tech Stack

### Frontend
- **Framework**: React with TypeScript
- **UI Components**: Shadcn UI
- **State Management**: React Context API
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

### Backend
- **Framework**: Ruby on Rails
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful API design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Ruby (v3.0 or higher)
- PostgreSQL (v12 or higher)
- Yarn or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd Connect
   ```

2. **Set up the backend**
   ```bash
   cd BackEnd
   bundle install
   rails db:create
   rails db:migrate
   rails db:seed  # Optional: Load sample data
   ```

3. **Set up the frontend**
   ```bash
   cd ../front/connect_react
   yarn install
   ```

4. **Environment Variables**
   Create a `.env` file in the frontend directory with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:3000
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd BackEnd
   rails server
   ```

2. **Start the frontend development server**
   ```bash
   cd front/connect_react
   yarn start
   ```

3. Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

## Project Structure

```
Connect/
├── BackEnd/                 # Ruby on Rails backend
│   ├── app/
│   ├── config/
│   ├── db/
│   └── ...
├── front/                  
│   └── connect_react/      # React frontend
│       ├── public/
│       ├── src/
│       │   ├── components/ # Reusable UI components
│       │   ├── contexts/   # React context providers
│       │   ├── hooks/      # Custom React hooks
│       │   ├── pages/      # Page components
│       │   ├── services/   # API services
│       │   └── types/      # TypeScript type definitions
│       └── ...
└── README.md
```

## Available Scripts

In the frontend directory, you can run:

- `yarn start` - Runs the app in development mode
- `yarn build` - Builds the app for production
- `yarn test` - Launches the test runner
- `yarn lint` - Runs ESLint for code linting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please open an issue in the repository.
