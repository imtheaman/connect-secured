import { Navigate, Outlet } from 'react-router-dom';
import useCookie from '../hooks/useCookie';
import useAppSelector from '../hooks/useAppSelector';

const SecuredRoute: React.FC = () => {
  const token = useAppSelector(({ session }) => session.token);
  return token ? <Outlet /> : <Navigate to='/signin' replace={true} />;
};

export default SecuredRoute;
