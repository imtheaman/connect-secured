import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const SecuredRoute: React.FC = () => {
  const [cookies] = useCookies(['token'])
  return cookies.token ? <Outlet /> : <Navigate to='/signin' replace={true} />;
};

export default SecuredRoute;
