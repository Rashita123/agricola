import { RegisterLeftBar } from "../../components/RegisterPage";
import { LoginRightBar } from "../../components/LoginPage";
export const Login = () => {
    return(
        <div className="flex flex-row justify-between items-stretch h-screen p-5 bg-neutral-800">
            <RegisterLeftBar/>
            <LoginRightBar/>
        </div>
    )
}