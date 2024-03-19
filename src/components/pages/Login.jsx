import FullPageLoader from '../../components/FullPageLoader.jsx';
//import { Link } from 'react-router-dom';
import {useState} from 'react';
import {auth} from '../../firebase/config.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "firebase/auth";
// don't need the Default getAuth as we are already using the 'Auth' variable above.
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/usersSlice.js';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../firebase/config.js'




function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState('');

  // adding State User Management
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      dispatch(setUser({id:user.uid, email: user.email}));
      
      // ...
    } else {
      // User is signed out
      dispatch(setUser(null));
      // This observer keeps the state of user within the App so there will be NO need to use the .then exception in the bellow functions.
       }// end of else
    if (isLoading) setIsLoading(false);
  });
  

  
  function handleCredentials(e) {
      
      setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
      // console.log("value of auth variable");
      // console.log(auth);
      // console.log("value of userCredentials");
      // console.log(userCredentials);

  }
// Handle SignUp
async function handleSignup(e) {
  e.preventDefault();
  setError("") // clearing up error message
  createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
  .then((userCredential) => {
    // Signed up 
  
    // console.log("value of user");
    // console.log(userCredential.user);
    //
   dispatch(setUser({id:userCredential.user.uid, email: userCredential.user.email}));

    // ...

    console.log('Capturing SignUp Info');
    console.log(userCredential.user.uid,userCredential.user.email );

// Add a new document with a generated id.
const docRef = addDoc(collection(db, "users"), {
  uid: userCredential.user.uid,
  email: userCredential.user.email
});
console.log("Document written with ID: ", docRef.id);


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(error.message) // capturing error message returned by Firebase database
    // console.log("value of error");
    // console.log(errorCode);
    // console.log(errorMessage);

    

    // ..
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

  const email = prompt ("Please enter a valid email to reset password!"); 
  sendPasswordResetEmail(auth,email)
  alert('Email sent! Please check your inbox for password reset instructions!')


}// End of function handlePasswordsReset
  

  
    return (
      <>
        { isLoading && <FullPageLoader></FullPageLoader> }
        
        <div className="container login-page">
          <section>
            <h1>Welcome to the Login Page</h1>
            <p>Login or create an account to continue</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Login
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Signup
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>Email *</label>
                      <input onChange={(e)=>{handleCredentials(e)}} type="text" name="email" placeholder="Enter your email" />
                  </div>
                  <div className="form-control">
                      <label>Password *</label>
                      <input onChange={(e)=>{handleCredentials(e)}} type="password" name="password" placeholder="Enter your password" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={(e)=>{handleLogin(e)}} className="active btn btn-block">Login</button>
                    : 
                    <button onClick={(e)=>{handleSignup(e)}} className="active btn btn-block">Sign Up</button>
               
                  }
                  {
                      error && 
                      <div className="error">
                      {error}  
                      </div>

                  }
                   


                  <p onClick={handlePasswordReset} className="forgot-password">Forgot Password?</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default Login