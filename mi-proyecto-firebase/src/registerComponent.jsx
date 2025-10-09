import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerAuth, googleSignIn, signOutAuth } from './store/slices/pokemon/thunks'

const RegisterComponent = () => {

    const dispatch = useDispatch()
    
    const [ formState, setState ] = useState({
        email: 'jhon.zuluaga@uao.edu.co',
        password: '123456'
    })

    const onInputChange = (evt) => {
        const { name, value } = evt.target
        setState({
            ...formState,
            [name]: value
        })
    }

    const onSumbit = (event) => {
        event.preventDefault()
        console.log(formState)
        dispatch(registerAuth(formState.email, formState.password))
    }

    const auth = useSelector(state => state.auth)

    return (
        <>
            <h1>Registro</h1>
            <hr />
            {auth && auth.email ? (
                <div>
                    <p>Conectado como: {auth.email}</p>
                    <button onClick={() => dispatch(signOutAuth())}>Logout</button>
                </div>
            ) : (
                <form onSubmit={onSumbit}>
                    <input 
                        type="email"
                        name="email"
                        onChange={ onInputChange }
                        value={formState.email}
                    />
                    <input 
                        type="password"
                        name="password"
                        onChange={ onInputChange }
                        value={formState.password}
                    />
                    <button type="submit">Registrar</button>
                    <button type="button" onClick={() => dispatch(googleSignIn())} style={{marginLeft: '8px'}}>Ingresar con Google</button>
                </form>
            )}
        </>
    )
}

export default RegisterComponent