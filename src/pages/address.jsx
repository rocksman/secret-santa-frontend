import TextArea from "../components/text-area";
import TextInput from "../components/text-input";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth.slice";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
    addressLine1: yup.string().required("Address Line 1 is required"),
    addressLine2: yup.string(),
    pincode: yup.string().required("Pincode is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    additionalInfo: yup.string(),
});

const auth = getAuth();

const Address = () => {
    const { userInfo } = useSelector(state => state.auth);
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if(showToast)
            setTimeout(() => setShowToast(false), 3000);
    }, [showToast])

    const signout = async () => {
        try {
            await signOut(auth)
            dispatch(logout());
            navigation('/');
        }
        catch (error) {
            // An error happened.
            console.log(error)
        };
    }
    const {
        register,
        handleSubmit,
        control,
        formState,
    } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        const userRef = doc(db, 'users', userInfo.user.email)
        await setDoc(userRef, { user: userInfo.user, address: data }, { merge: true })
        setShowToast(true);
        navigation('/dashboard');
    };

    return (
        <div className="bg-background min-h-screen w-screen flex justify-center bg-address bg-right-top bg-[length:100px_100px] md:bg-auto bg-no-repeat">
            <div className="w-[90%] md:w-[1200px] py-10 xl:py-20 xl:py-20 flex flex-row justify-between items-start">
                <div className="flex flex-col justify-between w-full md:w-2/5">
                    <div className="mb-8 flex flex-row space-x-2 xl:space-x-4">
                        <div className="border-2 border-primary p-1 rounded-full h-12 xl:h-16 w-12 xl:w-16">
                            <img src={userInfo.user.photoURL} className="rounded-full w-16" />
                        </div>
                        <div>
                            <h3 className="font-sans font-bold text-xl xl:text-2xl text-black xl:mb-1">Welcome back {userInfo.user.displayName?.split(' ')[0]}!</h3>
                            <p className="font-sans text-gray-dark text-sm xl:text-md">Not the right account? <button className="text-primary bg-transparent border-0 p-0" onClick={signout}>Sign out</button></p>
                        </div>
                    </div>
                    <h1 className="font-sans text-xl xl:text-2xl text-black font-medium mb-4 xl:mb-8">You know the drill</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <Controller
                            name="addressLine1"
                            control={control}
                            render={({ field }) =>
                                <TextInput
                                    label="Address Line 1"
                                    type="text"
                                    error={formState.errors.addressLine1?.message}
                                    {...field}
                                />
                            }
                        />
                        <Controller
                            name="addressLine2"
                            control={control}
                            render={({ field }) =>
                                <TextInput
                                    label="Address Line 2"
                                    type="text"
                                    {...field}
                                />
                            }
                        />
                        <div className="flex flex-row justify-between md:space-x-4 flex-wrap">
                            <Controller
                                name="pincode"
                                control={control}
                                render={({ field }) =>
                                    <TextInput
                                        label="Pincode"
                                        type="text"
                                        error={formState.errors.pincode?.message}
                                        {...field}
                                    />
                                }
                            />
                            <Controller
                                name="city"
                                control={control}
                                render={({ field }) =>
                                    <TextInput
                                        label="City"
                                        type="text"
                                        error={formState.errors.city?.message}
                                        {...field}
                                    />
                                }
                            />
                        </div>
                        <div className="flex flex-row justify-between md:space-x-4 flex-wrap">
                            <Controller
                                name="state"
                                control={control}
                                render={({ field }) =>
                                    <TextInput
                                        label="State"
                                        type="text"
                                        error={formState.errors.state?.message}
                                        {...field}
                                    />
                                }
                            />
                            <Controller
                                name="country"
                                control={control}
                                render={({ field }) =>
                                    <TextInput
                                        label="Country"
                                        type="text"
                                        error={formState.errors.country?.message}
                                        {...field}
                                    />
                                }
                            />
                        </div>
                        <Controller
                            name="additionalInfo"
                            control={control}
                            render={({ field }) =>
                                <TextArea
                                    label="Say what you want (but don't reveal yourself)"
                                    rows={3}
                                    {...field}
                                />}
                        />
                        <button type="submit" className="font-sans font-bold bg-white text-black px-8 py-2 md:w-auto w-full">
                            Jump In
                        </button>
                    </form>
                </div>
            </div>
            {showToast &&
                <div className='fixed top-10 right-10'>
                    <div id="toast-simple" class="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
                        <svg class="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="#fd510c" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9" />
                        </svg>
                        <div class="ps-4 text-sm font-normal">Registered successfully.</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Address;