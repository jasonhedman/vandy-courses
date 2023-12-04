# Integration and Deployment Guide

This guide provides step-by-step instructions for integrating and deploying the Next.js app on Vercel.

## Prerequisites

Before getting started, ensure that you have the following prerequisites:

- Node.js installed on your local machine
- A Vercel account

## Installation

Follow these steps to install the dependencies for the Next.js app:

1. Open a terminal or command prompt.
2. Navigate to the root directory of the Next.js app.
3. Run the following command to install the dependencies specified in the `package.json` file:

```bash
npm install

yarn install
```

## Running the App Locally

To run the Next.js app locally, use the following command:

```bash
npm run dev

yarn dev
```

This command will start the development server, and you can access the app in your browser at `http://localhost:3000`.

## Deploying to Production on Vercel

The app is continuously integrated to production via Vercel and GitHub actions. Any push to the `main` branch, if the build succeeds, will update the production deployment at https://www.vandy.app/.

## Additional Configuration

If you need to customize the deployment settings or configure environment variables, refer to the Vercel documentation for more information.

Remember to populate all of the necessary environment variables on `.env.local` on your local machine and in the `Environment Variables` section on the Vercel deployment.

That's it! You have successfully integrated and deployed your Next.js app on Vercel. Enjoy your application development and deployment journey!