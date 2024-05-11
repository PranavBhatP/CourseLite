import React , { useState } from 'react'
import { useNavigate , Navigate} from 'react-router-dom';
import { MdPerson } from "react-icons/md";
const Register = () => {
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate('');
    return (
        <main className = "flex items-center justify-center bg-black h-screen">
            <div className="bg-gray-500 flex flex-col border-gray-700 backdrop-blur-lg justify-center lg:w-3/5 mx-auto rounded-lg my-52 bg-opacity-20 lg:h-3/5 py-10">
                <div className="sm:mx-auto sm:w-4/5 sm:max-w-sm lg:w-full lg:h-full">
                <MdPerson className='text-white text-9xl text-right mx-32'/>
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Sign Up as admin {role} account.
                </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit = {handleLogin} >
                    <div>
                    <label htmlFor="userId" className="block text-sm font-medium leading-6 text-white">
                        Email
                    </label>
                    <div className="mt-2">
                        <input
                        id="userId"
                        name="userId"
                        type="text"
                        autoComplete="userId"
                        value = {email}
                        required
                        onChange = {(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>
                    <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                        Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        id="password"
                        name="password"
                        type="password"
                        value = {password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value) }
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>
                    <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                    </div>
                </form>
                <div className='flex w-full items-center justify-center px-auto'><a href = "/" className='text-white text-center pt-5 w-4/5'>Home Page🏠</a></div>
                </div>
                {error && <p>{error}</p>}
            </div>
        </main>
    )
}

export default Register