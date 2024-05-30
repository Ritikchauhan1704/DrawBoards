import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<App />} />
      <Route path="/:id" element={<App />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
