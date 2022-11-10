import { LendPoolItem } from "./LendPoolItem"
import { useEffect, useState } from "react"
export const LenderPage = () => {
    const [poolVal, setPoolVal] = useState(0)
    useEffect(() => {
        if (window.poolValue) setPoolVal(window.poolVal)
    }, [])
    return (
        <div class="flex flex-row bg-indigo-50 p-6 min-h-screen m-auto w-full">
            <div class="w-full h-full">
                <main class="flex w-full">
                    <div class="mx-auto px-4 sm:px-6 md:px-8">
                        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            Lend
                        </h2>
                        <div class="w-full h-full">
                            <div>
                                <div>
                                    <dl class="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
                                        <div class="px-10 py-6 flex flex-col justify-start align-start">
                                            <div class="text-xl font-normal text-gray-900 text-left">
                                                Total Pool Value
                                            </div>
                                            <dd class="mt-4 flex justify-between items-baseline md:block lg:flex">
                                                <div class="flex items-baseline text-3xl font-semibold text-indigo-600">
                                                    {poolVal ? poolVal : '...'}
                                                    <span class="ml-2 text-base font-medium text-gray-500">
                                                        USD
                                                    </span>
                                                </div>
                                            </dd>
                                        </div>
                                        <div class="px-10 py-6">
                                            <dt class="text-xl font-normal text-gray-900 text-left">
                                                Available Pool Value
                                            </dt>
                                            <dd class="mt-4 flex justify-between items-baseline md:block lg:flex">
                                                <div class="flex items-baseline text-3xl font-semibold text-indigo-600">
                                                    20,000
                                                    <span class="ml-2 text-base font-medium text-gray-500">
                                                        USD
                                                    </span>
                                                </div>
                                            </dd>
                                        </div>
                                        <div class="px-10 py-6">
                                            <dt class="text-xl font-normal text-gray-900 text-left">
                                                Liquidity
                                            </dt>
                                            <dd class="mt-4 flex justify-between items-baseline md:block lg:flex" />
                                            <div class="flex items-baseline text-3xl font-semibold text-indigo-600">
                                                24.57%
                                            </div>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                            <div class="mt-4">
                                <LendPoolItem logo="assets/logos/usdc.png"></LendPoolItem>
                                <LendPoolItem logo="assets/logos/usdt.png"></LendPoolItem>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}