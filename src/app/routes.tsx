import { createBrowserRouter } from 'react-router';
import {
  Homepage,
  HowItWorks,
  Pricing,
  Checkout,
} from '../pages/common';
import {
  Login,
  ForgotPassword,
  ResetPassword,
  Registration,
} from '../pages/auth';
import {
  BrandSignup,
  BrandLogin,
  BrandDashboard,
  BrandPublicProfile,
} from '../pages/brand';
import {
  InfluencerListing,
  InfluencerProfile,
  SignupInfluencer,
  InfluencerLogin,
  InfluencerDashboardNew,
} from '../pages/influencer';
import { AdminPanel } from '../pages/admin';
import RootLayout from './RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: 'browse',
        element: <InfluencerListing />,
      },
      {
        path: 'profile/:id',
        element: <InfluencerProfile />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <BrandSignup />,
      },
      {
        path: 'signup-brand',
        element: <BrandSignup />,
      },
      {
        path: 'signup-influencer',
        element: <SignupInfluencer />,
      },
      {
        path: 'influencer/login',
        element: <InfluencerLogin />,
      },
      {
        path: 'influencer/dashboard',
        element: <InfluencerDashboardNew />,
      },
      {
        path: 'dashboard-influencer',
        element: <InfluencerDashboardNew />,
      },
      {
        path: 'dashboard-brand',
        element: <BrandDashboard />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'pricing',
        element: <Pricing />,
      },
      {
        path: 'admin',
        element: <AdminPanel />,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
      {
        path: 'how-it-works',
        element: <HowItWorks />,
      },
      {
        path: 'campaigns',
        element: <Homepage />,
      },
      {
        path: 'brand/login',
        element: <BrandLogin />,
      },
      {
        path: 'brand-public-profile',
        element: <BrandPublicProfile />,
      },
      {
        path: 'influencer-signup',
        element: <SignupInfluencer />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
    ],
  },
]);
