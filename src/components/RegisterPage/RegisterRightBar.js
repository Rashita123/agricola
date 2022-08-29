import { Link } from "react-router-dom";
export const RegisterRightBar = () => {
    return(
        <div className="w-2/3 ml-5  rounded-xl">
            {/* bg-neutral-500 */}
            <div className="w-3/5 m-auto flex flex-col justify-around h-full py-5 text-white">
                <div className="flex flex-col items-start">
                    <heading className="font-semibold text-3xl mb-3">Register</heading>
                    <div className="text-neutral-300">Have an account? <Link to="/login" className="text-sky-500">Login</Link></div>
                </div>

                <div className="text-neutral-300">
                    <form action="" className="flex flex-col items-start">
                        <p>Register as?</p>
                        <div className="flex flex-row justify-between items-start w-full mt-2 mb-5">
                            <div className="flex justify-left items-center border-2 border-neutral-700 w-1/3 mr-5 py-3 pl-3 pr-12 rounded-lg text-left hover:bg-neutral-700">
                                <input type="radio" id="farmer" name="user_type" value="FARMER" className="mr-2"/>
                                <label for="farmer" className="cursor-pointer text-md">Farmer</label>
                            </div>
                            <br/>
                            <div className="flex justify-left items-center border-2 border-neutral-700 w-1/3 mr-5 py-3 pl-3 pr-12 rounded-lg text-left hover:bg-neutral-700">
                            <input type="radio" id="lender" name="user_type" value="LENDER" className="mr-2"/>
                            <label for="lender" className="cursor-pointer text-md">Lender</label>
                            </div>
                            <br/>
                            <div className="flex justify-left items-center border-2 border-neutral-700 w-1/3 py-3 pl-3 pr-12 rounded-lg text-left hover:bg-neutral-700">
                            <input type="radio" id="staker" name="user_type" value="STAKER" className="mr-2"/>
                            <label for="staker" className="cursor-pointer text-md">Staker</label>
                            </div>
                        </div>
                    </form>

                    <form className="flex flex-col justify-between items-stretch text-left">
                    <div>
                            <span>Username</span>
                            <input
                                type="text"
                                class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-300
                                    bg-neutral-700 bg-clip-padding
                                    border border-solid border-gray-600
                                    rounded
                                    transition
                                    ease-in-out
                                    mt-2
                                    mb-5
                                "
                                id="username"
                                placeholder="Enter username"
                                />
                        </div>

                        <div>
                            <span>E-mail</span>
                            <input
                                type="email"
                                class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-300
                                    bg-neutral-700 bg-clip-padding
                                    border border-solid border-gray-600
                                    rounded
                                    transition
                                    ease-in-out
                                    mt-2
                                    mb-5
                                "
                                id="exampleEmail0"
                                placeholder="Email input"
                                />
                        </div>
                        <div>
                            <span>Password</span>
                            <input
                                type="password"
                                class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-300
                                    bg-neutral-700 bg-clip-padding
                                    border border-solid border-gray-600
                                    rounded
                                    transition
                                    ease-in-out
                                    mt-2
                                    mb-5
                                "
                                id="Password"
                                placeholder="Enter Password"
                                />
                        </div>

                        <div>
                            <span>Confirm Password</span>
                            <input
                                type="password"
                                class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-300
                                    bg-neutral-700 bg-clip-padding
                                    border border-solid border-gray-600
                                    rounded
                                    transition
                                    ease-in-out
                                    mt-2
                                    mb-5
                                "
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                />
                        </div>
                    </form>
                </div>

                <button className="text-white bg-sky-500 hover:bg-sky-800 hover:text-gray-200 w-fit py-3 px-5 rounded-md">Create account</button>
            </div>
        </div>
    )
}