import { createContext, useState } from 'react'

const STATE_INITIAL = {
  menuActive: true,
}

const StateContext = createContext(STATE_INITIAL)

function StateProvider(props) {
  const [state, setState] = useState(STATE_INITIAL);
  const [loginType, setLoginType] = useState(false);

  const { children } = props

  const isActiveMenu = () => {
    setState({
      ...state,
      menuActive: !state.menuActive,
    })
  }

  const value = {
    state,
    isActiveMenu,
    loginType,
    setLoginType
  }

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

export { StateProvider, StateContext }
