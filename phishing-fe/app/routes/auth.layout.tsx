import Header from '../components/header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
}
