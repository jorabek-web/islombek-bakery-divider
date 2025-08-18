import { FaCamera } from "react-icons/fa";
import { ChangePassword, LeaveTheAccount } from "./_components";
import { IoIosArrowForward, IoMdNotifications } from "react-icons/io";

import {
  useProfileQuery,
  useUpdateAvatarMutation,
  useUploadImageMutation,
} from "@/integration/api/authApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidMessageError } from "react-icons/bi";
export const ProfileUI = () => {
  const { data: profile } = useProfileQuery({});
  const [updateAvatar] = useUpdateAvatarMutation();
  const [uploadImage] = useUploadImageMutation();
  const navigate = useNavigate();
  const [avatarImg, setavatarImg] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResult = await uploadImage(formData).unwrap();

      await updateAvatar({
        avatar: JSON.parse(uploadResult).url,
      });
    } catch (error) {
      console.error("Failed to upload avatar", error);
    }
  };

  useEffect(() => {
    if (profile?.avatar) {
      setavatarImg(profile.avatar);
    }
  }, [profile]);

  console.log(profile);

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] py-[30px] fixed top-0 w-full -mt-[30px] -ml-[20px]">
        <div className="flex items-center text-[#FFCC15] justify-start gap-x-[20px] pt-[35px]">
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="absolute size-[100px] z-10 opacity-0"
            />
            <img
              src={avatarImg}
              alt="avatar"
              loading="lazy"
              className="rounded-full size-[90px]"
            />
            <div className="bg-slate-300/50 rounded-full p-2 max-w-max absolute bottom-0 right-0">
              <FaCamera size={20} className="text-white" />
            </div>
          </div>
          <p className="text-[24px] font-semibold text-white">
            {profile?.fullName}
          </p>
          <div className="absolute bottom-6 right-20">
            <IoMdNotifications
              onClick={() => navigate("/notification")}
              className="relative left-14"
              size={30}
              color="#FFCC15"
              cursor={"pointer"}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 w-full gap-y-[20px] pt-[100px] text-[#1C2C57]">
        <div className="flex items-center justify-between">
          <BiSolidMessageError
            onClick={() => navigate("/information")}
            size={25}
            color="#FFCC15"
            cursor={"pointer"}
          />
        </div>

        <div className="w-full text-white text-center font-inter text-[25px] font-bold tracking-[1px] flex items-center gap-2">
          <button
            className="w-full bg-white p-3 rounded-lg flex items-center gap-5 border-2 border-solid border-yellow-400 mb-4"
            onClick={() => navigate("/salaries")}
          >
            <span className="text-[#1C2C57] font-bold text-[15px]">
              Maoshlarim
            </span>
            <span className="bg-[#1C2C57] p-1 px-1.5 rounded-md absolute t-[50%] right-8">
              <IoIosArrowForward color="#FFCC15" />
            </span>
          </button>
        </div>

        <ChangePassword />

        <LeaveTheAccount />
      </div>
    </div>
  );
};
