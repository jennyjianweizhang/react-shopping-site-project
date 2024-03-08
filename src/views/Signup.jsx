import React , { useRef, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import app from '../service/config'
import { useNavigate } from 'react-router-dom';


export default function Signup() {
    const db = getFirestore(app);
    const navigate = useNavigate();
    const navigateToSignIn = () => {
        navigate('/signin'); 
    };

    const [uname, setUname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const unameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const getUname = () => {
        setUname(unameRef.current.value)
    }

    const getEmail = () => {
        setEmail(emailRef.current.value)
    }

    const getPassword = () => {
        setPassword(passwordRef.current.value)
    }

    const handleClick = async (e) => {
        e.preventDefault();

        const auth = getAuth();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // await updateProfile(user, {
            //     displayName: uname 
            // });
            
            const useObj = {
                name: uname,
                email,
                password,
                id: user.uid
            }

            const docRef = await addDoc(collection(db, "users"), useObj);
            console.log("Document written with ID: ", docRef.id);
            navigate('/signin');
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    
    <div className="container signupContainer">
        <h3>Sign up to Salinaka</h3>
        <div className="row py-5 mt-4 align-items-center">
        <div className="col-md-4 col-lg-6 ml-auto">
                <form action="#" onSubmit={handleClick}>
                    <div className="row">
                        <label className="label-input" htmlFor="fullname">* Full Name</label>
                        <div className="input-group col-lg-6 mb-4">
                            <input id="fullName" type="text" name="fullname" placeholder="John Doe" onBlur={getUname} ref={unameRef}className="form-control bg-white border-left-0 border-md"/>
                        </div>

                        <label className="label-input" htmlFor="email">* Email</label>
                        <div className="input-group col-lg-12 mb-4">
                            <input id="email" type="email" name="email" placeholder="test@example.com"  onBlur={getEmail} ref={emailRef}className="form-control bg-white border-left-0 border-md" autoComplete="username"/>
                        </div>

                        <label className="label-input" htmlFor="password">* Password</label>
                        <div className="input-group col-lg-6 mb-4">
                            <input id="password" type="password" name="password" placeholder="Your Password" onBlur={getPassword} ref={passwordRef}className="form-control bg-white border-left-0 border-md" autoComplete="current-password"/>
                        </div>

                        {/* <div className="input-group col-lg-6 mb-4">
                            <input id="passwordConfirmation" type="text" name="passwordConfirmation" placeholder="Confirm Password" className="form-control bg-white border-left-0 border-md"/>
                        </div> */}

                        <div className="form-group col-lg-12 mx-auto mb-0 signupBox">
                            <button type="submit" href="#" className="btn btn-primary btn-block py-2 signup">
                                <span className="font-weight-bold">Sign Up &#8594; </span>
                            </button>
                        </div>

                    </div>
                </form>
            </div>

            <div className="col-md-4 col-lg-1 d-flex flex-column justify-content-center align-items-center">
                <div className="vertical-divider"></div>
                <span className="px-2 small text-muted font-weight-bold text-muted">OR</span>
                <div className="vertical-divider"></div>
            </div>

            <div className="col-md-4 col-lg-4 pr-lg-5">
            <div className="form-group col-lg-12 mx-auto">
                <a href="#" className="btn btn-primary btn-block py-2 btn-facebook socialBox">
                    <svg className="fbIcon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                    <i className="fa fa-facebook-f mr-2"></i>
                    <span className="font-weight-bold">Continue with Facebook</span>
                </a>
                <a href="#" className="btn btn-primary btn-block py-2 btn-google socialBox">
                    <svg className="gIcon"xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M2.897 4.181c2.43-2.828 5.763-4.181 9.072-4.181 4.288 0 8.535 2.273 10.717 6.554-2.722.001-6.984 0-9.293 0-1.674.001-2.755-.037-3.926.579-1.376.724-2.415 2.067-2.777 3.644l-3.793-6.596zm5.11 7.819c0 2.2 1.789 3.99 3.988 3.99s3.988-1.79 3.988-3.99-1.789-3.991-3.988-3.991-3.988 1.791-3.988 3.991zm5.536 5.223c-2.238.666-4.858-.073-6.293-2.549-1.095-1.891-3.989-6.933-5.305-9.225-1.33 2.04-1.945 4.294-1.945 6.507 0 5.448 3.726 10.65 9.673 11.818l3.87-6.551zm2.158-9.214c1.864 1.734 2.271 4.542 1.007 6.719-.951 1.641-3.988 6.766-5.46 9.248 7.189.443 12.752-5.36 12.752-11.972 0-1.313-.22-2.66-.69-3.995h-7.609z"/></svg>
                    <i className="fa fa-google mr-2"></i>
                    <span className="font-weight-bold">Continue with Google</span>
                </a>
                <a href="#" className="btn btn-primary btn-block py-2 btn-github socialBox">
                <svg className="gitcon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    <i className="fa fa-github mr-2"></i>
                    <span className="font-weight-bold">Continue with Github</span>
                </a>
                </div>
            </div>
        </div>
        
    </div>
    <div className="container">
        <div className="text-center w-100 bottomBox">
            <p className="text-muted font-weight-bold text">Already have an account? </p>
            <button className="button button-small button-border button-border-gray" type="button" onClick={navigateToSignIn}>Sign In</button>
        </div>
    </div>
    

    </>

  )
}
