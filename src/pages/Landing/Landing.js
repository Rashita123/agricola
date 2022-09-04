import { UseAuthenticationContext } from "../../context/AuthenticationContext"
export const Landing = () => {
    const id="0x15674e372bf8f8959471bb0ed1cf4066ba95f751"
    const idString = id.substring(0,8) + "..."+id.substring(35);
    const { userState, userDispath } = UseAuthenticationContext();
    return(
        <div class="flex flex-row bg-indigo-50 p-6 min-h-screen m-auto w-full">
        <div class="w-full h-full">
            <main class="flex w-full">
                <div class="mx-auto px-4 sm:px-6 md:px-8">
                    <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Hello User
                    </h2>
                    <div class="text-xl font-normal text-gray-900 text-left">
                        {/* Account: {userState.selectedMetamaskAccount} */}
                        Account: <span class="text-sm font-normal text-gray-900 text-left">{idString}</span>
                    </div>
                    <div class="text-xl font-normal text-gray-900 text-left">
                        Balance: <span class="text-sm font-normal text-gray-900 text-left">{userState.accountBalance}</span>
                    </div>
                </div>
            </main>
        </div>
        </div>
    )
}