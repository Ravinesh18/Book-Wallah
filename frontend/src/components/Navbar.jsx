import { Link, matchPath, useLocation } from "react-router-dom"
import { NavbarLinks } from "../data/NavbarLinks"
import ProfileDropdown from "./Auth/ProfileDropdown";
import { useSelector } from "react-redux";

export const Navbar = () => {

    const location =useLocation();
    function matchRoute(route){
        return matchPath(route,location.pathname)
    }
    const {token} = useSelector((state)=>state.auth)

    return (
        <div className='flex h-14 items-center justify-center  bg-indigo-100  '>

            <div className='flex flex-row  fixed bg-indigo-100 z-[100] justify-center items-center w-11/12 h-[4rem]'>
                {/* <Link to={'/'}>
                    
                     <p>BookWallah</p>
                </Link> */}
                <nav >
                    <ul className='flex flex-row gap-x-6 text-black font-semibold text-xl font-mono'>
                        {
                            NavbarLinks.map((link, index) => (

                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                            <div className='group relative flex items-center gap-2 '>
                                                {/* <p>{link.title}</p>
                                            <IoIosArrowDropdownCircle/> 
                                            <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                                                
                                                {
                                                    subLinks.length >0 ?
                                                    subLinks.map((subLink,index)=>(
                                                        <Link to={`/catalog/${subLink.name
                                                            .split(" ")
                                                            .join("-")
                                                            .toLowerCase()}`}>
                                                            <div className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'>{subLink.name}</div>
                                                        </Link>
                                                        
                                                    ))
                                                    :(<div></div>)
                                                }
                                           
                                            <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded-md bg-richblack-5 '>

                                            </div>
                                            </div> */}

                                            </div>) : (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-indigo-500" : "text-richblack-100"}`}>
                                                    {link.title}
                                                </p>

                                            </Link>

                                        )
                                    }
                                </li>
                            ))

                        }

                    </ul>
                </nav>
                {/* login and signupp */}
                <div className="right-20 items-center justify-center flex absolute">                    
                    {

                        token !== null && (<ProfileDropdown />)
                    } 

                </div> 
            </div>
        </div>
    )
}
