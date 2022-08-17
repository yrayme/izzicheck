import React, { createContext, useState } from 'react';

const SignUpContext = createContext();

const SignUpProvider = ({children}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [successfulPassword, setSuccessfulPassword] = useState(false);
    const [formSignUp, setFormSignUp] = useState({});

    const handleChange = (e) => {
    setformConsultor({ ...formConsultor, [e.target.id]: e.target.value });
    };

    const handleChecked = (e) => {
    setformConsultor({ ...formConsultor, [e.target.id]: e.target.checked });
    };
    const data = {activeStep, setActiveStep, successfulPassword, setSuccessfulPassword,
                    formSignUp, setFormSignUp};
    return <SignUpContext.Provider value={data}>{children}</SignUpContext.Provider>
}

export {SignUpProvider};

export default SignUpContext;