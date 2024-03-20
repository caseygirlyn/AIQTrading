import React, { useState } from 'react';
import FullPageLoader from '../../components/FullPageLoader.jsx';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { auth } from '../../firebase/config.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "firebase/auth";
// don't need the Default getAuth as we are already using the 'Auth' variable above.
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/usersSlice.js';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase/config.js'

function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(getInitialMode(true));
  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedMode || false; // If no saved mode, default to light mode
  }

  // Function to toggle between dark and light mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // adding State User Management
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      dispatch(setUser({ id: user.uid, email: user.email }));

      // ...
    } else {
      // User is signed out
      dispatch(setUser(null));
      // This observer keeps the state of user within the App so there will be NO need to use the .then exception in the bellow functions.
    }// end of else
    if (isLoading) setIsLoading(false);
  });

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }
  // Handle SignUp
  async function handleSignup(e) {
    e.preventDefault();
    setError("") // clearing up error message
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        // Signed up 

        dispatch(setUser({ id: userCredential.user.uid, email: userCredential.user.email }));

        console.log('Capturing SignUp Info');
        console.log(userCredential.user.uid, userCredential.user.email);

        // Add a new document with a generated id.
        const docRef = addDoc(collection(db, "users"), {
          uid: userCredential.user.uid,
          email: userCredential.user.email
        });
        console.log("Document written with ID: ", docRef.id);

        setSubmitted(true);
        // Reset submission status after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
          window.location.reload();  // Reload the current route
        }, 5000);
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(error.message) // capturing error message returned by Firebase database
      });
  } //end of function handleSignup

  function handleLogin(e) {
    e.preventDefault();
    setError("") // clearing up error message

    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        // Signed in 

        console.log("value of user");
        console.log(userCredential.user);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(error.message)
      });

  }// End of function handleLogin

  function handlePasswordReset() {

    const email = prompt("Please enter a valid email to reset password!");
    sendPasswordResetEmail(auth, email)
    alert('Email sent! Please check your inbox for password reset instructions!')

  }// End of function handlePasswordsReset

  return (
    <div className={isDarkMode ? 'darkMode' : 'lightMode'} >
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="darkModeSwitch"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
        <label className="form-check-label" htmlFor="darkModeSwitch">
          {isDarkMode ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon-stars-fill"></i>}
        </label>
      </div>
      <Header />
      {isLoading && <FullPageLoader></FullPageLoader>}

      <div className="container content px-4 pt-3">
        <section className="row pt-5">
          <div className='banner mt-5 mb-5 p-md-5 p-3 d-grid shadow align-items-center justify-items-center'>
            <h2 className="w-100 text-white text-center">Login or create an account to continue</h2>
          </div>
        </section>
        <section className="m-auto" style={{ maxWidth: '500px' }}>
          <div className="login-type d-flex justify-space-evenly">
            <h3 role='button'
              className={`btn rounded-0 w-50 btn-lg mx-1 mb-0 ${loginType == 'login' ? 'selected bg-secondary-color text-white ' : 'btn-outline-secondary'}`}
              onClick={() => setLoginType('login')} style={{ borderWidth: '0' }}>
              Login
            </h3>
            <h3 role='button'
              className={`btn rounded-0 w-50 btn-lg mx-1 mb-0 ${loginType == 'signup' ? 'selected bg-secondary-color text-white ' : 'btn-outline-secondary'}`}
              onClick={() => setLoginType('signup')} style={{ borderWidth: '0' }}>
              Signup
            </h3>
          </div>
          <form className="add-form login p-4 shadow" style={{ border: '1px solid #3d4354' }}>
            <div className={`${loginType == 'signup' ? 'd-block' : 'd-none'}`}>
              <div className="form-floating mb-3">
                <input onChange={(e) => { handleCredentials(e) }} type="text" name="firstname" placeholder="Enter your first name" className="form-control bg-white text-dark" id="firstname" />
                <label className="form-label text-secondary" htmlFor="firstname">First Name *</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={(e) => { handleCredentials(e) }} type="text" name="lastname" placeholder="Enter your last name" className="form-control bg-white text-dark" id="lastname" />
                <label className="form-label text-secondary" htmlFor="lastname">Last Name *</label>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input onChange={(e) => { handleCredentials(e) }} type="text" name="email" placeholder="Enter your email" className="form-control bg-white text-dark" id="email" />
              <label className="form-label text-secondary" htmlFor="email">Email *</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={(e) => { handleCredentials(e) }} type="password" name="password" placeholder="Enter your password" className="form-control bg-white text-dark" id="password" />
              <label className="form-label text-secondary" htmlFor="password">Password *</label>
            </div>
            {
              loginType == 'login' ?
                <button onClick={(e) => { handleLogin(e) }} className="btn btn-secondary bg-secondary-color w-100 p-3 border-0 mb-2">Login</button>
                :
                <button onClick={(e) => { handleSignup(e) }} className="btn btn-secondary bg-secondary-color w-100 p-3 border-0 mb-2">Sign Up</button>
            }
            {
              error &&
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            }
            {submitted ? (
              <div className="alert alert-success" role="alert">
                Signed up successfully! Check your email for confirmation.
              </div>
            ) : ''}
            <p onClick={handlePasswordReset} className="forgot-password mb-0">Forgot Password?</p>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Login