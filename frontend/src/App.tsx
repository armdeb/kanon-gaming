import { Suspense, lazy } from 'react'; // Import Suspense and lazy
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingScreen } from './components/Loading';
import { NavHead } from './components/NavHead';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // disable automatic refetching
      staleTime: 5 * 60 * 1000, // keep data for 5 minutes
    },
  },
});

const HomePage = lazy(() => import('./Pages/Home'));
const SlotMachinePage = lazy(() => import('./Pages/SlotMachine'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ErrorBoundary>
          <main>
            <NavHead />
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/slot-machine" element={<SlotMachinePage />} />
              </Routes>
            </Suspense>
          </main>
        </ErrorBoundary>
      </Router>
    </QueryClientProvider >
  );
}

export default App;
