'use client';
import useAuthenticate from '@/hook/useAuthenticate';
import NavigateBar from './components/navigateBar';
import LoadingScreen from './components/common/LoadingScreen';
import './style.css'
import MessagePopup from './components/MessagePopup';

const Layout = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuthenticate()
  if (!isLoading && isAuthenticated) return (
    <>
      <NavigateBar />
      {children}
      <MessagePopup />
    </>
  )
  return <LoadingScreen />
}
export default Layout