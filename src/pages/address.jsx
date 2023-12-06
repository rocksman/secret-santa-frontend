import TextArea from "../components/text-area";
import TextInput from "../components/text-input";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import { db } from "../config/firebase";

const schema = yup.object().shape({
    addressLine1: yup.string().required("Address Line 1 is required"),
    addressLine2: yup.string(),
    pincode: yup.string().required("Pincode is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    additionalInfo: yup.string(),
});

const Address = () => {
    const { userInfo } = useSelector(state => state.auth);
    const {
        register,
        handleSubmit,
        control,
        formState,
    } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        console.log(data);
        const userRef = doc(db, 'users', userInfo.user.email)
        await setDoc(userRef, {user: userInfo.user, address: data}, { merge: true })
        console.log('Data successfully saved to Firestore!', userRef.id);
    };

    return (
        <div className="bg-background min-h-screen w-screen flex justify-center bg-address bg-right-top bg-no-repeat">
            <div className="w-[1200px] py-10 xl:py-20 xl:py-20 flex flex-row justify-between items-start">
                <div className="flex flex-col justify-between w-2/5">
                    <div className="mb-8 flex flex-row space-x-2 xl:space-x-4">
                        <div className="border-2 border-primary p-1 rounded-full h-12 xl:h-16 w-12 xl:w-16">
                            <img src={userInfo.user.photoURL} className="rounded-full w-16" />
                        </div>
                        <div>
                            <h3 className="font-sans font-bold text-xl xl:text-2xl text-black xl:mb-1">Welcome back {userInfo.user.displayName?.split(' ')[0]}!</h3>
                            <p className="font-sans text-gray-dark text-sm xl:text-md">Not the right account? <button className="text-primary bg-transparent border-0 p-0">Sign out</button></p>
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
                                    {...field}
                                />
                            }
                        />
                        <span>{formState.errors.addressLine1?.message}</span>
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
                        <span>{formState.errors.addressLine2?.message}</span>
                        <div className="flex flex-row justify-between space-x-4 flex-wrap">
                            <Controller
                                name="pincode"
                                control={control}
                                render={({ field }) =>
                                    <TextInput
                                        label="Pincode"
                                        type="text"
                                        {...field}
                                    />
                                }
                            />
                            <span>{formState.errors.pincode?.message}</span>
                            <Controller
                                name="city"
                                control={control}
                                render={({ field }) =>
                                    <TextInput
                                        label="City"
                                        type="text"
                                        {...field}
                                    />
                                }
                            />
                            <span>{formState.errors.city?.message}</span>
                        </div>
                        <div className="flex flex-row justify-between space-x-4 flex-wrap">
                            <Controller
                                name="state"
                                control={control}
                                render={({ field }) =>
                                    <TextInput
                                        label="State"
                                        type="text"
                                        {...field}
                                    />
                                }
                            />
                            <span>{formState.errors.state?.message}</span>
                            <Controller
                                name="country"
                                control={control}
                                render={({ field }) =>
                                    <TextInput
                                        label="Country"
                                        type="text"
                                        {...field}
                                    />
                                }
                            />
                            <span>{formState.errors.country?.message}</span>
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
                        <button type="submit" className="font-sans font-bold bg-white text-black px-8 py-2">
                            Jump In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Address;