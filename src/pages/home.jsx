import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router";
import HomeImg from '../assets/home.svg';
import HomeText from '../assets/home-text.svg';
import { useDispatch, useSelector } from "react-redux";
import { collection, where, getDocs, query, doc, getDoc } from "firebase/firestore";
import { login } from "../redux/features/auth.slice";
import { useEffect, useState } from "react";
import { db } from "../config/firebase"

const provider = new GoogleAuthProvider();
const auth = getAuth();

const Home = () => {
    const navigation = useNavigate();
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const usersRef = collection(db, "users");

    const [userLogin, setUserLogin] = useState();

    useEffect(() => {
        (async () => {
            if (userLogin) {
                try {
                    const userRef = doc(db, "users", userLogin.email);
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        const user = docSnap.data();
                        dispatch(login(user))
                        if (user?.address)
                            navigation('/dashboard')
                        else
                            navigation('/address');
                    } else {
                        // docSnap.data() will be undefined in this case
                        console.log("No such document!");
                        dispatch(login({ user: { displayName: userLogin.displayName, email: userLogin.email, photoURL: userLogin.photoURL } }))
                        navigation('/address');
                    }
                }
                catch (err) {
                    console.log("No such document!");
                    dispatch(login({ user: { displayName: userLogin.displayName, email: userLogin.email, photoURL: userLogin.photoURL } }))
                    navigation('/address');
                }
            }
        })();
    }, [userLogin])

    const clickHandler = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setUserLogin(user);

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    return (
        <div className="bg-background w-screen h-screen flex items-center justify-center">
            <div className="w-[90%] md:w-[1200px] flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start">
                <img src={HomeImg} className="w-[240px] md:w-[480px]" />
                <div className="flex flex-col justify-between items-center">
                    <img src={HomeText} className="w-[520px]" />
                    <p className="font-sans text-xl text-black font-medium mb-8">Please let's all play fair this time yeah</p>
                    <button type="button" className="font-sans font-bold bg-white text-black px-8" onClick={clickHandler}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default Home;