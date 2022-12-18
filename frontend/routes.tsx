import HelloReactView from 'Frontend/views/helloreact/HelloReactView.js';
import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy, Suspense } from 'react';
import { ActionFunctionArgs, createBrowserRouter } from 'react-router-dom';
import { uiStore } from './stores/app-store';
import LoginView from './views/login/LoginView';
import TodoView from './views/todo/TodoView';

const AboutView = lazy(async () => import('Frontend/views/about/AboutView.js'));

const authGuard = async ({ request, params, context }: ActionFunctionArgs) => {
  if (!uiStore.loggedIn) {
    // Save requested path
    sessionStorage.setItem('login-redirect-path', context.pathname);
    return context.redirect('/login');
  }
  return undefined;
};

const router = createBrowserRouter([
  { path: '/login', element: <LoginView /> },
  {
    element: <MainLayout />,
    action: authGuard,
    children: [
      { path: '/', element: <HelloReactView /> },
      { path: '/hello', element: <HelloReactView /> },
      {
        path: '/about',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutView />
          </Suspense>
        ),
      },
      { path: '/todo', element: <TodoView /> },
    ],
  },
]);

export default router;
