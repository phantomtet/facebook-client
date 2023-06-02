'use client';
import useAuthenticate from '@/hook/useAuthenticate';
import NavigateBar from './components/navigateBar';
import LoadingScreen from './components/common/LoadingScreen';
import './style.css'

const Layout = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuthenticate()
  if (!isLoading && isAuthenticated) return (
    <>
      <NavigateBar />
      {children}
    </>
  )
  return <LoadingScreen />
}
export default Layout