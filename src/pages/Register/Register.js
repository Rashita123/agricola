import { RegisterLeftBar, RegisterRightBar } from "../../components/RegisterPage"
export const Register = () => {
    return(
        <div className="flex flex-row justify-between items-stretch h-screen p-5 bg-neutral-800">
            <RegisterLeftBar/>
            <RegisterRightBar/>
        </div>
    )
}