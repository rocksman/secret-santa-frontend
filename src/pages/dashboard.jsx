import { useEffect, useRef, useState } from 'react'
import DashboardDate from "../assets/dashboard-date.svg";
import MatchImage from "../assets/match.svg";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "flowbite";
import { db } from '../config/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { login, logout } from '../redux/features/auth.slice';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth();

const Dashboard = () => {
    const drawerRef = useRef(null);
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const navigation = useNavigate();

    const [matchInfo, setMatchInfo] = useState({});
    const [participants, setParticipants] = useState([]);
    const [showToast, setShowToast] = useState(false);

    const signout = () => {
        signOut(auth).then(() => {
            dispatch(logout())
            navigation('/')
        }).catch((error) => {
            // An error happened.
        });
    }

    useEffect(() => {
        (async () => {
            if (userInfo.user.email) {
                const userRef = doc(db, "users", userInfo.user.email);
                const userSnap = await getDoc(userRef);
                const user = userSnap.data();
                dispatch(login(user));
            }
            let _participants = [];
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                _participants.push(doc.data());
                setParticipants(_participants);
            });
        })();
    }, [])

    useEffect(() => {
        (async () => {
            if (userInfo?.matchedEmail) {
                const matchRef = doc(db, "users", userInfo.matchedEmail);
                const matchSnap = await getDoc(matchRef);
                const match = matchSnap.data();
                setMatchInfo(match);
            }
        })();
    }, [userInfo])

    useEffect(() => {
        if(showToast)
            setTimeout(() => setShowToast(false), 3000);
    }, [showToast])

    const toggleDrawer = (value) => {
        const options = {
            placement: 'right',
            backdrop: true,
            bodyScrolling: false,
            edge: false,
            edgeOffset: '',
            backdropClasses:
                'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30',
            onHide: () => {
                console.log('drawer is hidden');
            },
            onShow: () => {
                console.log('drawer is shown');
            },
            onToggle: () => {
                console.log('drawer has been toggled');
            },
        };
        const drawer = new Drawer(drawerRef.current, options);
        if(value)
            drawer.show();
        else
            drawer.hide();
    }

    const sendFriendMail = async (reciever) => {
        try {
            const response = await fetch('https://secret-santa-dev.azurewebsites.net/miss-friend', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sender: userInfo.user, reciever }),
                referrerPolicy: "no-referrer"
            })
            toggleDrawer(false);
            setShowToast(true)
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="bg-background w-screen min-h-screen flex items-start justify-center">
            <div className="w-[90%] md:w-[1200px] my-10 xl:my-20">
                <div className="mb-8 flex flex-row space-x-2 xl:space-x-4">
                    <div className="border-2 border-primary p-1 rounded-full h-12 xl:h-16 w-12 xl:w-16">
                        <img src={userInfo.user.photoURL} className="rounded-full w-16" />
                    </div>
                    <div>
                        <h3 className="font-sans font-bold text-xl xl:text-2xl text-black xl:mb-1">Welcome back {userInfo.user.displayName?.split(' ')[0]}!</h3>
                        <p className="font-sans text-gray-dark text-sm xl:text-md">Not the right account? <button className="text-primary bg-transparent border-0 p-0" onClick={signout}>Sign out</button></p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-end min-h-[400px]">
                    {
                        userInfo?.isMatchConfirmed ?
                            (
                                <>
                                    <div className="flex flex-col items-center justify-center">
                                        <div
                                            style={{ '--image-url': `url(${String(matchInfo.user?.photoURL).replace('96', '512')})` }}
                                            className="bg-[image:var(--image-url)] h-60 w-60 bg-cover flex items-center justify-center rounded-full">
                                        </div>
                                        <img src={MatchImage} className="absolute w-90 mb-8 rounded-full z-50 bottom-70" />
                                    </div>
                                    <div className='mt-20'>
                                        <h3 className='font-sans text-black font-regular text-2xl'>You've been matched with <b>{matchInfo.user?.displayName}</b></h3>
                                    </div>
                                    <div className="bg-white p-6 rounded-md shadow-md mt-8">
                                        <h4 className="text-xl text-black font-sans mb-4 text-center">Special note from <b>{matchInfo.user?.displayName}</b></h4>
                                        <p className="text-gray-dark font-sans w-full p-6 md:w-[400px] text-center bg-light-gray rounded-md">
                                            {matchInfo.address?.additionalInfo}
                                        </p>
                                    </div>
                                    <div className="bg-white p-6 rounded-md shadow-md mt-4">
                                        <h4 className="text-xl text-black font-sans mb-4 text-center"><b>{matchInfo.user?.displayName}'s</b> Address</h4>
                                        <p className="text-gray-dark font-sans w-full md:w-[400px]">
                                            {/* Assuming matchInfo has an 'address' property, modify this accordingly */}
                                            <p><b>Street Address: </b>{matchInfo.address?.addressLine1 + ', ' + matchInfo.address?.addressLine2}</p>
                                            <p><b>City: </b>{matchInfo.address?.city}</p>
                                            <p><b>State: </b>{matchInfo.address?.state}</p>
                                            <p><b>Country: </b>{matchInfo.address?.country}</p>
                                            <p><b>Pincode: </b>{matchInfo.address?.pincode}</p>
                                            {/* {matchInfo.address?.addressLine1 + matchInfo.address?.addressLine2 + matchInfo.address?.city + matchInfo.address?.state + matchInfo.address?.pincode + matchInfo.address?.country} */}
                                        </p>
                                    </div>
                                </>
                            ) :
                            (
                                <div className="flex flex-col items-center justify-center">
                                    <img src={DashboardDate} className="w-32 mb-8" />
                                    <h1 className="font-sans text-3xl text-black font-medium mb-8 text-center">You gotta wait for a while to find out...</h1>
                                    <p className="font-sans text-2xl text-black mb-1 text-center">In the meantime, <span onClick={()=>toggleDrawer(true)} className="text-primary cursor-pointer">view</span> which of your friends are being naughty or nice</p>
                                </div>
                            )
                    }
                </div>
            </div>
            <div ref={drawerRef} id="drawer-right-example" class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
                <div className='mb-8'>
                    <h5 id="drawer-right-label" class="font-sans text-black text-xl inline-flex items-center text-base font-semibold">Participants</h5>
                    <p className='text-gray-light font-sans text-sm'>These bitches are actually participating</p>
                </div>
                <div className='space-y-8'>
                    {participants.map((participant, index) => (
                        <div className="flex flex-row space-x-3 xl:space-x-4" key={index}>
                            <div className="border-2 border-primary p-0.5 rounded-full h-10 xl:h-12 w-10 xl:w-12">
                                <img src={participant?.user?.photoURL} className="rounded-full w-16" />
                            </div>
                            <div>
                                <h3 className="font-sans font-bold text-md text-black p-0 mb-0">{participant?.user?.displayName}</h3>
                                <button className="text-primary text-xs font-normal bg-transparent border-0 p-0" onClick={() => sendFriendMail(participant?.user)}>Tell them you miss them</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showToast &&
                <div className='fixed top-10 right-10'>
                    <div id="toast-simple" class="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
                        <svg class="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="#fd510c" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9" />
                        </svg>
                        <div class="ps-4 text-sm font-normal">Message sent successfully.</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Dashboard;