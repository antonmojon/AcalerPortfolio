import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import Root from './Root';
import PortfolioHome from './pages/PortfolioHome';

const AgoraPage = lazy(() => import('./pages/AgoraPage'));
const NightShift = lazy(() => import('./pages/NightShift'));
const LavanderiaPage = lazy(() => import('./pages/LavanderiaPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'));
const WeekuPage = lazy(() => import('./pages/WeekuPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: PortfolioHome },
      { path: 'agora', Component: AgoraPage },
      { path: 'night-shift', Component: NightShift },
      { path: 'lavanderia-bizkaia', Component: LavanderiaPage },
      { path: 'weeku', Component: WeekuPage },
      { path: 'about', Component: AboutPage },
      { path: 'contact', Component: ContactPage },
      { path: 'proximamente', Component: ComingSoonPage },
      { path: 'coming-soon', Component: ComingSoonPage },
    ],
  },
]);
