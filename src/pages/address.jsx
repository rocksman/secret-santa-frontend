import TextArea from "../components/text-area";
import TextInput from "../components/text-input";
import AddressTree from "../assets/address-tree.svg";
import { useSelector } from "react-redux";

const Address = () => {
    const {userInfo} = useSelector(state => state.auth);
    console.log(userInfo)
    return (
        <div className="bg-background w-screen h-screen flex items-center justify-center">
            <div className="w-[1200px] flex flex-row justify-between items-start">
                <div className="flex flex-col justify-between w-2/5">
                    <div className="mb-8 flex flex-row space-x-4">
                        <div className="border-2 border-primary p-1 rounded-full w-16">
                        <img src={userInfo.photoURL} className="rounded-full w-16"/>
                        </div>
                        <div>
                            <h3 className="font-sans font-bold text-2xl text-black mb-1">Welcome back {userInfo.displayName?.split(' ')[0]}!</h3>
                            <p className="font-sans text-gray-dark">Not the right account? <button className="text-primary bg-transparent border-0 p-0">Sign out</button></p>
                        </div>
                    </div>
                    <h1 className="font-sans text-3xl text-black font-medium mb-8">You know the drill</h1>
                    <TextInput label="Address Line 1" name="name" type="text" />
                    <TextInput label="Address Line 2" name="name" type="text" />
                    <div className="flex flex-row justify-between space-x-4 flex-wrap">
                        <TextInput label="Pincode" name="name" type="text" />
                        <TextInput label="City" name="name" type="text" />
                    </div>
                    <div className="flex flex-row justify-between space-x-4 flex-wrap">
                        <TextInput label="State" name="name" type="text" />
                        <TextInput label="Country" name="name" type="text" />
                    </div>
                    <TextArea label="Say what you want (but don't reveal yourself)" rows={4}/>
                    <button type="button" className="font-sans font-bold bg-white text-black px-8">Jump In</button>
                </div>
            </div>
            <img src={AddressTree} className="absolute right-0 h-[958px]"/>
        </div>
    )
}

export default Address;