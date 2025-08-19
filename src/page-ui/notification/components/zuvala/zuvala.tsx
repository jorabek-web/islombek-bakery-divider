import { Status } from "@/constants/status";
import {
  useGetDoughBallNotificationsQuery,
  useUpdateDoughBallNotificationMutation,
} from "@/integration";
import { toast, Toaster } from "react-hot-toast";
import { FaRegClock } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";

export const Zuvala = () => {
  const { data: dough_ball_notifications } = useGetDoughBallNotificationsQuery(
    {}
  );
  const [update_dough_ball_notification] =
    useUpdateDoughBallNotificationMutation();

  const handleUpdate = async (id: string, status: string) => {
    const res = await update_dough_ball_notification({ id, status }).unwrap();

    if (res.data) {
      toast.success(res.data.message);
    } else if (res.error) {
      toast.error(res.error.data.message);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="text-white space-y-3">
        {dough_ball_notifications ? (
          dough_ball_notifications?.length > 0 &&
          dough_ball_notifications.filter((item) => item.status === "PENDING")
            .length > 0 ? (
            dough_ball_notifications
              .filter((item) => item.status === "PENDING")
              .map((item) => (
                <div
                  key={item._id}
                  className="rounded-[12px] border-[2px] border-[#FFCC15] p-[10px] text-white"
                >
                  <p className="text-[20px] font-[600]">
                    Zuvalalar soni o’zgardi
                  </p>
                  <div className="flex items-center justify-between gap-2 py-[10px]">
                    <div className="flex items-center gap-x-2">
                      <LuCalendarDays size={20} />
                      <p className="text-[10px] font-[400]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <FaRegClock size={20} />
                      <p className="text-[10px] font-[400]">
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2 w-2/5">
                      <p className="text-[16px] font-[400]">
                        {item.oldCount}tadan {item.count}taga
                      </p>
                    </div>
                  </div>

                  <div className="w-full p-2 flex items-center justify-between gap-5">
                    <button
                      onClick={() => handleUpdate(item._id, Status.REJECTED)}
                      className="bg-[#C71A1A] p-1 px-3 rounded-[3px] text-white"
                    >
                      Bekor qilish
                    </button>
                    <button
                      onClick={() => handleUpdate(item._id, Status.ACCEPTED)}
                      className="bg-[#099431] p-1 px-3 rounded-[3px] text-white"
                    >
                      Tasdiqlash
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-center text-white">
              hozircha bildirishnomalar mavjud emas
            </p>
          )
        ) : (
          <p className="text-center text-white">Loading...</p>
        )}
      </div>
    </div>
  );
};
