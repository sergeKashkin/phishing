import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <h3>Phishing Admin Panel</h3>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
