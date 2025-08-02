import { FaBell } from "react-icons/fa"
import { Link } from "react-router-dom"
import { ChooseBranch } from "./_components"

export const TopBar = () => {
    return (
        <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full">
            <div className="flex justify-between items-center">
                <ChooseBranch />
                <Link to='/notification' aria-label="Bildirishnoma">
                    <FaBell size={25} className="text-[#FFCC15] cursor-pointer" />
                </Link>
            </div>
        </div>
    )
} 