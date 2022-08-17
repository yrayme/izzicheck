import { useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../contexts/useAuthContext'
import LayoutMenuLeft from '../layout/LayoutMenuLeft'
// import LayoutMenuLeft from '../layout/LayoutMenuLeft'
// import { Box } from '@mui/material'
// import Splash from '../utils/splash'

const WithAuth = (props) => {
  const { children, safe } = props

  const router = useRouter()
  const { auth, load } = useContext(AuthContext);

  if (load) {
    return "loading..."
  }

  if (safe && auth.auth) {
    return <LayoutMenuLeft>   
              {children}
          </LayoutMenuLeft>
  } 

  if (safe && !auth.auth) {
    router.replace('/')
    return <></>
  }

  if (!safe && auth.auth) { 
    if (auth.data.role?.id === 1){
      router.replace('/cashier/code');
    }else{
      router.replace('/dashboard');
    }
    return <></>
  }

  return children
}

export default WithAuth
