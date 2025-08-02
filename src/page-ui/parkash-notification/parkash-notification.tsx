import { Title } from "@/components"
import { Button } from "@/components/ui/button"
import { useGetNotificationsQuery, useUpdateNotificationMutation } from "@/integration"
import { socket } from "@/utils"
import { useEffect } from "react"
import { FaRegClock } from "react-icons/fa"
import { IoArrowBack } from "react-icons/io5"
import { LuCalendarDays } from "react-icons/lu"
import { Link } from "react-router-dom"

export const ParkashNotification = () => {
    const { data: getNotifications, refetch } = useGetNotificationsQuery({});
    const [updateNotification] = useUpdateNotificationMutation()

    useEffect(() => {
        const handleNotification = () => refetch();
        socket.on("notification", handleNotification);
        return () => {
            socket.off("notification", handleNotification);
        };
    }, []);
    return (
        <>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full">
                <div className="flex justify-between items-center">
                    <Link to={'/'}>
                        <IoArrowBack
                            size={25}
                            className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
                        />
                    </Link>
                    <Title text={"Bildirishnoma"} className="text-white mx-auto" />
                </div>
            </div>
            <div className="pt-[35px] text-white space-y-3">
                {getNotifications?.filter((item) => item.type === "DELIVERED" && item.delivery).map((item) => (
                    <div key={item._id} className="rounded-[12px] border-[2px] border-[#FFCC15] p-[10px]">
                        <p className="text-[20px] font-[600]">{item.from.fullName}</p>
                        <div className="flex items-center justify-between pt-[10px]">
                            <div className="flex items-center gap-x-2">
                                <LuCalendarDays size={20} />
                                <p className="text-[10px] font-[400]">{new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <FaRegClock size={20} />
                                <p className="text-[10px] font-[400]">{new Date(item.createdAt).toLocaleTimeString()}</p>
                            </div>
                            <p className="text-[15px] font-[500]">{item.delivery?.breads || 0} non</p>
                        </div>
                        {item?.status === "PENDING" && (
                            <div className="flex items-center justify-between pt-[25px]">
                                <Button variant='destructive' onClick={() => updateNotification({ id: item._id, status: "REJECTED" })}>Bekor qilish</Button>
                                <Button variant='greenary' onClick={() => updateNotification({ id: item._id, status: "ACCEPTED" })}>Tasdiqlash</Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}