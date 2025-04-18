import { useSelector } from 'react-redux';
import { RiEditBoxLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    return (
        <>
            <div className='flex flex-col lg:flex-row mx-auto items-center justify-center mt-10 bg-indigo-300 p-5 rounded-lg'>
                <div className='flex flex-col gap-y-6 lg:w-4/12 w-full justify-center items-center'>
                    <img
                        src={user?.profileImage}
                        alt={`profile-${user?.fullname}`}
                        className="aspect-square w-2/3 md:w-1/3 rounded-full object-cover"
                    />
                    <div>
                        <p className='text-lg font-semibold'>{user?.fullname}</p>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row space-x-0 lg:space-x-20 w-full lg:w-8/12 p-5'>

                    <div className='w-full'>
                        <div className='flex gap-x-7 justify-between items-center'>
                            <p className='text-lg font-semibold my-4'>Personal Details</p>
                            <button
                                onClick={() => {
                                    // navigate("/dashboard/settings")
                                }}
                            >
                                <RiEditBoxLine className="text-xl" />
                            </button>
                        </div>
                        <div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 md:gap-x-48 items-center'>
                                <div>
                                    <p className='text-md opacity-60'>Name</p>
                                    <p className='text-xl py-3 font-semibold font-mono'>{user?.fullname}</p>
                                </div>
                                <div>
                                    <p className='text-md opacity-60'>Email</p>
                                    <p className='text-xl py-3 font-semibold font-mono'>{user?.email}</p>
                                </div>
                                <div>
                                    <p className='text-md opacity-60'>Date Of Birth</p>
                                    <p className='text-xl py-3 font-semibold font-mono'>
                                        {user?.dateOfBirth ?? <p className='text-lg font-normal font-sans opacity-80'>--</p>}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-md opacity-60'>Books Posted</p>
                                    <p className='text-xl py-3 font-semibold font-mono'>{user?.book.length > 1 ? user?.book.length : "0"}</p>
                                </div>
                            </div>
                        </div>
                        <div className='my-4 py-1'>
                            <p className='text-md opacity-60'>About</p>
                            <p>{user?.favouriteGenre?.length ? <p className='text-xl py-3 font-semibold font-mono'> I like to read </p> : <p></p>}</p>
                            <p>
                                {user?.favouriteGenre?.length > 1
                                    ? user.favouriteGenre.map((genre, index) => (
                                        <p className='text-xl py-3 font-semibold font-mono' key={index}>{genre}</p>
                                    ))
                                    : <p className='text-lg opacity-80 py-4'>Add your favourite genre</p>
                                }
                            </p>
                            <button
                                onClick={() => {
                                    navigate("/dashboard/settings");
                                }}
                                className="flex items-center text-xl mt-4"
                            >
                                <RiEditBoxLine className="mr-2" /> Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyProfile;
