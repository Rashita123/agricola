export const RegisterLeftBar = () => {
    return(
        <div className="flex flex-col text-left items-start bg-neutral-900 text-slate-100 p-10 w-1/3 rounded-xl justify-between align-stretch">
            <header className="font-semibold text-lg">AGRICOLA</header>
            <div>
                <div className="text-5xl mb-5">Start your journey with us.</div>
                <div className="text-xl">Some text based on what the person is, a farmer, lender or a staker</div>
            </div>
            <div className="p-9 w-full bg-neutral-700 rounded-xl">
                <div className="mb-5">Simply unbelievable! I am really happy with my projects and business. This is absolutely wonderful!</div>
                <div className="flex flex-row justify-start items-center">
                    <img src="https://images.pexels.com/photos/804009/pexels-photo-804009.jpeg?auto=compress&cs=tinysrgb&w=800" alt="user" className="w-10 h-10 rounded-md mr-3"></img>
                    <div className="flex flex-col">
                        <span>Timson K.</span>
                        <span>Farmer</span>
                    </div>
                </div>
            </div>
        </div>
    )
}