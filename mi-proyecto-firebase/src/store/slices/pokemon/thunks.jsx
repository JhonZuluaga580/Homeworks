import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { register, logout } from '../authSlice'
import { signOut } from 'firebase/auth'

export const registerAuth = (email, password) => {
    return async (dispatch) => {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        if (response) {
            await updateProfile(auth.currentUser, {
                displayName: 'Jhon Zuluaga',
                photoURL: ''
            })

            const { email } = response.user
            dispatch(register({ email }))
        } else{
            throw new Error('login Failed')
        }
    }
}

export const googleSignIn = () => {
    return async (dispatch) => {
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)
            const { email, displayName, photoURL, uid } = result.user
            dispatch(register({ email, displayName, photoURL, uid }))
        } catch (error) {
            console.error('Google sign-in failed', error)
            throw error
        }
    }
}

export const signOutAuth = () => {
    return async (dispatch) => {
        try {
            await signOut(auth)
            console.log('Sign out success')
            dispatch(logout())
        } catch (error) {
            console.error('Sign out failed', error)
            throw error
        }
    }
}
