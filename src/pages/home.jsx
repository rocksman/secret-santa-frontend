import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router";
import HomeImg from '../assets/home.svg';
import HomeText from '../assets/home-text.svg';
import { useDispatch } from "react-redux";
import { login } from "../redux/features/auth.slice";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const Home = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const clickHandler = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                dispatch(login(user))
                navigation('/address');

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
            <div className="w-[1200px] flex flex-row justify-between items-start">
                <img src={HomeImg} className="w-[480px]"/>
                <div className="flex flex-col justify-between items-center">
                <img src={HomeText} className="w-[520px]"/>
                <p className="font-sans text-xl text-black font-medium mb-8">Please let's all play fair this time yeah</p>
                <button type="button" className="font-sans font-bold bg-white text-black px-8" onClick={clickHandler}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default Home;