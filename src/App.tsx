import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';

// Lazy load all pages for code-splitting
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const Faq = lazy(() => import('./pages/Faq'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <div className="bg-background text-on-background font-body antialiased pb-24 md:pb-0 selection:bg-dusty-peach/30 selection:text-primary min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={
          <div className="flex h-[50vh] items-center justify-center">
            <div className="w-8 h-8 border-4 border-dusty-peach border-t-primary rounded-full animate-spin"></div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
