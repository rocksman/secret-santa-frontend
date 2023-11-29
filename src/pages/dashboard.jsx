import { useRef } from 'react'
import DashboardDate from "../assets/dashboard-date.svg";
import { useSelector } from "react-redux";
import { Drawer } from "flowbite";

const Dashboard = () => {
    const drawerRef = useRef(null);
    const { userInfo } = useSelector(state => state.auth);
    console.log(userInfo)

    const openDrawer = () => {
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
        drawer.show();
    }

    return (
        <div className="bg-background w-screen h-screen flex items-start justify-center">
            <div className="w-[1200px] my-20">
                <div className="mb-8 flex flex-row space-x-4">
                    <div className="border-2 border-primary p-1 rounded-full w-16">
                        <img src={userInfo.photoURL} className="rounded-full w-16" />
                    </div>
                    <div>
                        <h3 className="font-sans font-bold text-2xl text-black mb-1">Hey {userInfo.displayName?.split(' ')[0]}!</h3>
                        <p className="font-sans text-gray-dark">Not the right account? <button className="text-primary bg-transparent border-0 p-0">Sign out</button></p>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center min-h-[600px]">
                    <div className="flex flex-col items-center justify-center">
                        <img src={DashboardDate} className="w-32 mb-8" />
                        <h1 className="font-sans text-3xl text-black font-medium mb-8 text-center">You gotta wait for a while to find out...</h1>
                        <p className="font-sans text-2xl text-black mb-1 text-center">In the meantime, <span onClick={openDrawer} className="text-primary cursor-pointer">view</span> which of your friends are being naughty or nice</p>
                    </div>
                </div>
            </div>
            <div ref={drawerRef} id="drawer-right-example" class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
                <h5 id="drawer-right-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">Hello</h5>
            </div>
        </div>
    )
}

export default Dashboard;