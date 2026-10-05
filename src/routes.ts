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
const SelvaVivaPage = lazy(() => import('./pages/SelvaVivaPage'));
const AgricultoresPage = lazy(() => import('./pages/AgricultoresPage'));
const RedBullPage = lazy(() => import('./pages/RedBullPage'));
const AlibetopiasPage = lazy(() => import('./pages/AlibetopiasPage'));

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
      { path: 'selvaviva', Component: SelvaVivaPage },
      { path: 'alibetopias', Component: AlibetopiasPage },
      { path: 'red-bull-inside', Component: RedBullPage },
      { path: 'agricultores', Component: AgricultoresPage },
      { path: 'about', Component: AboutPage },
      { path: 'contact', Component: ContactPage },
      { path: 'proximamente', Component: ComingSoonPage },
      { path: 'coming-soon', Component: ComingSoonPage },
    ],
  },
]);
