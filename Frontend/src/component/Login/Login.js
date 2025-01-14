import React, {useState, useContext} from 'react'
import "./Login.css"
import { useNavigate, Link } from 'react-router-dom'
import Axios from 'axios'
import socket from "../utils/socket";
import { UserContext } from '../../context/UserContext';

const Alert = () => {
	return (
		<div class="block text-xs font-semibold text-red-600 mt-2">
			Your Email or Password is incorrect!!
		</div>
	);
};


const Login = () => {
	const { setUserDetails } = useContext(UserContext);
	
	const [User, setUser] = useState({
		username:'',
		password:''
	})
	const [alert, setAlert] = useState(false);
	const navigate = useNavigate();

	const inputHandle = (e) => {
		const { name, value } = e.target;
		// console.log(name, value);
		setUser({
			...User,
			[name]: value,
		});
	};
	
	const submitHandle = async (e) => {
		e.preventDefault();

		try {
			const response = await Axios.post(
				"http://localhost:4000/login",
				 User
			);
			if (response.request.status == 201) {
				socket.connect();
				let receivedUser = response.data.user;
				setUserDetails(receivedUser);
				return navigate("/dashboard");
			}
			if (response.request.status == 250) return setAlert(true);
		} catch (err) {
			console.log(err);
		}
	};

	
	return (
		
			<div className="dark-theme">
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 theme-color">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<img
							className="mx-auto h-10 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt="Your Company"
						/>
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
							Sign in to your account
						</h2>
					</div>

					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form
							className="space-y-6"
							onSubmit={submitHandle}
						>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 "
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="username"
										type="email"
										autoComplete="email"
										required
										className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black"
										onChange={inputHandle}
									/>
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<label
										htmlFor="password"
										className="block text-sm font-medium leading-6"
									>
										Password
									</label>
									<div className="text-sm">
										<a
											href="#"
											className="font-semibold text-indigo-600 hover:text-indigo-500"
										>
											Forgot password?
										</a>
									</div>
								</div>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										onChange={inputHandle}
									/>
									{alert && <Alert />}
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sign-btn"
								>
									Sign in
								</button>
							</div>
						</form>

						<p className="mt-10 text-center text-sm text-gray-500">
							Not a member?{" "}
							<a
								// href="#"
								className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 "
								// onClick={goToSignup} // toggle signup
							>
								<Link to="/signup">Sign Up</Link>
								<Link to="/dashboard">
									<br />
									Go to Dashboard
								</Link>
							</a>
						</p>
					</div>
				</div>
			</div>
	);
}

export default Login