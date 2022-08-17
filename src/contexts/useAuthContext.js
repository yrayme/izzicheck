import React, { createContext, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import configApp from '../../config/config';

const PATHNAME_POST = [
  '/',
  '/login',
  '/signUp',
  '/password-recovery',
  '/password-recovery/new-password',
  // '/dashboard',
  // '/report',
  // '/users'
]

const STATE_INITIAL = {
  token: '',
  auth: false,
  data: undefined,
}

const AuthContext = createContext(STATE_INITIAL)

function AuthProvider(props) {
  const router = useRouter()
  const [auth, setAuth] = useState(STATE_INITIAL)
  const [load, setLoad] = useState(true)

  const { children } = props

  const login = (token, data, callback) => {
    setAuth({
      ...auth,
      data,
      token,
      auth: true,
    })
    if (callback && typeof xx === 'function') {
      callback()
    }
    sessionStorage.setItem('token', token)
    setLoad(false)
  }

  const logout = (callback) => {
    setAuth({
      ...auth,
      token: '',
      auth: false,
      data: undefined,
    })
    if (callback && typeof xx === 'function') {
      callback()
    }
    sessionStorage.clear()
    setTimeout(() => setLoad(false), 500)
  }

  const updateData = (token, callback) => {
    setAuth({
      ...auth,
      data: {},
      token,
      auth: true,
    })
    if (callback && typeof xx === 'function') {
      callback()
    }
    setTimeout(() => setLoad(false), 500)
  }

  useEffect(() => {
    const initial = async () => {
      const pathname = location.pathname || ''
      let path = PATHNAME_POST.filter((p) => p === pathname).length > 0
      try {
        setLoad(true)
        const token = sessionStorage.getItem('token')
        if (token) {
          const url = `${configApp.baseUrl}/profile/session`
          const { data, status } = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          if (status !== 200) {
            throw ''
          }
          const redirect = path || pathname === '/';
          login(
            token,
            data.data,
            redirect ? data.data?.role?.id === 1 ? router.replace('/cashier/code') : router.replace('/dashboard') : null
          )
        } else if (!path) {
          throw ''
        }
      } catch (error) {
        logout(path ? null : router.replace('/'))
        //logout(path ? null : router.replace('/'))
        // callback(false)
      } finally {
        setLoad(false)
      }
    }
    initial()
  }, [])

  const value = {
    auth,
    load,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
