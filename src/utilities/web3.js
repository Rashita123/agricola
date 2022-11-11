import { BigNumber } from 'ethers'

export const tenPow18 = BigNumber.from(10).pow(18)

export function normalize(input) {
    input = BigNumber.from(input || 0)
    return input.div(tenPow18).toString()
}

export function denormalize(input) {
    input = BigNumber.from(input || 0)
    return input.mul(tenPow18).toString()
}

export const getStatus = (active, approved, paid, repayed, liquidated) => {
    if (liquidated) return 'Loan Liquidated'
    if (repayed) return 'Loan Repayed'
    if (paid) return 'Paid to Borrower'
    if (approved) return 'Loan Started'
    if (!active) return 'Loan Finished'
    return 'Loan Active'

}