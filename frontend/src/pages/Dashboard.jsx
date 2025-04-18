import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet, matchPath, useLocation } from 'react-router-dom'
// import Sidebar from '../components/core/Dashboard/Sidebar'
import MyProfile from '../components/Profile/MyProfile'
const Dashboard = () => {
    const location = useLocation()
    const { loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)
    const matchRoute = (route) => {
        console.log(route, 'route')
        console.log(location.pathname, 'pathname,')
        return matchPath({ path: route }, location.pathname)
    }

    if (authLoading || profileLoading) {
        console.log(authLoading)
        return (

            <div className='spinner mx-auto translate-y-[25rem]'></div>
        )
    }
    return (
        <div>
            <div className='w-11/12 mx-auto h-[100vh]'>
                <MyProfile />
                <div className='flex mt-8 mx-auto justify-evenly items-center p-8 text-lg font-bold w-10/12 gap-x-2'>
                    <NavLink
                        to={'/dashboard/user-books'}
                        className={`
                        transition-all duration-200 w-10/12`}
                    >
                        <div className="flex flex-col items-center gap-y-3">

                            <span>Your Books</span>
                            <span
                              className={`${matchRoute('/dashboard/user-books') ? 'bg-indigo-500 ' : 'bg-indigo-200' } rounded-lg transition-all duration-300 w-10/12 h-1`}

                            ></span>
                        </div>
                    </NavLink>
                    <div className='w-[0.8px] h-8 bg-indigo-500'>

                    </div>
                    <NavLink
                        to={'dashboard/borrowed-books'}
                        className={`
                        transition-all duration-200 w-10/12`}
                    >
                        <span
                            className={`${matchRoute('/dashboard/borrowed-books') ? console.log('matched here') : ''}`}
                        ></span>
                        <div className="flex flex-col items-center gap-y-3">

                            <span>Borrowed Books</span>
                            <span
                                className={`${matchRoute('/dashboard/borrowed-books') ? 'bg-indigo-500 ' : 'bg-indigo-200' } rounded-lg w-10/12 transition-all duration-300 h-1`}

                            ></span>
                        </div>
                    </NavLink>
                </div>

                <div className=''>
                    <div className=''>
                        <Outlet />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard