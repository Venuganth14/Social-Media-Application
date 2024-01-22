import React, { useEffect, useState } from "react";
import { auth, provider } from "../auth/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { Button } from "react-bootstrap";
import { AiFillGoogleCircle } from "react-icons/ai";

function GoogleAuth({ handleAuth }) {
    const [value, setValue] = useState('')
    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            console.log(data, "Data");
            if (data) {
                handleAuth(data)
            }
        })
    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    })

    return (
        <div>
            <Button onClick={handleClick} type="submit" variant="success" className="btn-success" style={{ backgroundColor: "#e74c3c",width:"100% " }}>
                Sign In with Google <AiFillGoogleCircle/>
            </Button>
            {/* <button onClick={handleClick}>Signin With Google</button> */}
        </div>
    );
}
export default GoogleAuth;