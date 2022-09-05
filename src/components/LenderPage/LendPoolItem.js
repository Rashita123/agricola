import { useState, useEffect } from "react"
import { UseAuthenticationContext } from '../../context/AuthenticationContext'
import * as ethers from 'ethers'
import { useWeb3React } from '@web3-react/core'
import ReactTooltip from 'react-tooltip';
import config from '../../config'

const { BigNumber } = ethers

export const LendPoolItem = ({ logo }) => {
    const [enabled, setEnabled] = useState(true);
    const [usdcBalance, setUSDCBalance] = useState('0');
    const [instances, setInstances] = useState(null);
    const [lendInput, setLendInput] = useState(0)

    const { userState, _userDispath } = UseAuthenticationContext();
    const userAddress = localStorage.getItem('metamask-account')

    const { library } = useWeb3React()


    useEffect(() => {
        if (!window.instances) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const lendInstance = new ethers.Contract(config.lend.address, config.lend.abi, provider.getSigner())
            const usdcInstance = new ethers.Contract(config.usdc.address, config.usdc.abi, provider.getSigner())
            setInstances(window.instances = { lendInstance, usdcInstance })
        }
    }, [])

    useEffect(() => {
        (async () => {
            if (!instances) return
            const balance = await instances.usdcInstance.balanceOf(userAddress)
            console.log({ balance })
            setUSDCBalance(balance?.toString() || 0)
        })()
    }, [instances, userAddress])

    const handleLend = async () => {
        if (!instances || !lendInput || lendInput.startsWith('0')) return
        window.config = config
        if (BigNumber.from(await instances.usdcInstance.allowance(userAddress, config.lend.address)).lt(lendInput))
            await instances.usdcInstance.approve(config.lend.address, ethers.constants.MaxUint256)
        await instances.lendInstance.lendTokens(BigNumber.from(lendInput).mul(10n ** 18n), config.usdc.address)
        // show modal and refresh
    }

    return (
        <>
            <div class="relative bg-white p-6 shadow rounded-lg mt-8">
                <div class="flex flex-col">
                    <div class="flex flex-row items-center justify-between">
                        <div>
                            <div class="rounded-md p-4">
                                <img class="h-8 w-8" src={logo} alt="" />
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <p class="text-2xl font-semibold text-gray-900">
                                {/* <!-- {{token}} --> */}
                                USDC
                            </p>
                            <p class="text-sm font-medium text-gray-500 text-ellipsis">0x15674e372bf8f8959471bb0ed1cf4066ba95f751</p>
                        </div>

                        <div class="flex flex-col p-2 text-left justify-between">
                            <div>
                                <span>Pool Value: </span>
                                <span class="font-bold text-indigo-600">$12</span>
                            </div>
                            <div>
                                <span>USDC Price: </span>
                                <span class="font-bold text-indigo-600">$1</span>
                            </div>
                        </div>
                        <div onClick={enabled => setEnabled(enabled => !enabled)}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>


                    {enabled && <div class="flex flex-row bg-gray-50 -ml-6 -mr-6 -mb-6 justify-between p-6 rounded-lg">
                        <div class="flex flex-col w-1/2 p-2">
                            <div>
                                <div class="flex flex-row justify-between">
                                    <label class="block text-base font-medium text-gray-700">Lend</label>
                                    <div>
                                        <span class="text-sm">Wallet Balance: </span>
                                        <span data-tip={usdcBalance} class="font-bold text-sm text-indigo-600">{usdcBalance.slice(0, 5)}{usdcBalance.length > 5 ? '...' : ''} USDC</span>
                                    </div>
                                </div>

                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <input type="text" onChange={e => setLendInput(e.target.value)} class="h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 text-base border-gray-300 rounded-md" placeholder="Enter amount" />
                                </div>
                            </div>
                            <button type="button" onClick={handleLend} class="justify-center mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Lend
                            </button>
                        </div>
                        <div class="flex flex-col w-1/2 p-2">
                            <div>
                                <label for="email" class="block text-base font-medium text-gray-700">Withdraw</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <input type="text" class="h-14 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 text-base border-gray-300 rounded-md" placeholder="Enter amount" />
                                </div>
                            </div>
                            <button type="button" class="justify-center mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Withdraw
                            </button>
                        </div>
                    </div>}

                    <div class="flex flex-row bg-gray-50 -ml-6 -mr-6 -mb-6 justify-between p-6 rounded-lg">
                        <div>
                            <span>Amount lent: </span>
                            <span class="font-bold text-indigo-600">12 USDC</span>
                        </div>
                    </div>
                </div>
            </div>
            <ReactTooltip delayHide={1000} />
        </>
    )
}