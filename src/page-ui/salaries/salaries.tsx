import { BiSolidMessageError } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { FaReply } from "react-icons/fa";
import { Tabs, UZBTime } from "../../components/common";
import { Hisoblangan, Olingan } from "./components";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { MoneyFormatter } from "../../utils";
import toast, { Toaster } from "react-hot-toast";
import { useGetUSerMeQuery, useUpdateRefundMutation } from "@/integration";
import { IoArrowBack } from "react-icons/io5";

export const SalariesUI = () => {
  const navigate = useNavigate();
  const { data: user } = useGetUSerMeQuery([]);
  const [refund] = useUpdateRefundMutation();
  const [amount, setAmount] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  async function handleRefundAmountChange() {
    if (!amount || !amount.trim() || amount == "0") {
      toast.error("kerakli maydonga miqdorni kiriting");
      return;
    }

    if (!user) return;

    const response = await refund({
      id: user._id,
      amount,
    });

    if ("error" in response) {
      const err = response.error as { data?: { message?: string } };
      const message = err.data?.message ?? "Xatolik yuz berdi!";
      toast.error(message);
      return;
    }
    console.log(response);

    toast.success("muvaffaqiyatli yakunlandi");
    setIsOpen(false);
  }

  return (
    <div>
      <header className="flex justify-between items-end px-5 border-b-2 border-b-[#FFCC15] pb-3 rounded-[30px] fixed top-0 left-0 w-full">
        <Toaster position="top-center" reverseOrder={false} />
        <IoArrowBack
          size={25}
          onClick={() => navigate(-1)}
          className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
        />
        <h2 className="text-white text-center font-inter text-[25px] font-bold tracking-[1px] mt-2 flex flex-col items-center ">
          <p>Balans</p>
          <p>{MoneyFormatter(user?.salaryBalance ?? "0")}</p>
        </h2>

        <IoMdNotifications
          onClick={() => navigate("/notification")}
          size={30}
          color="#FFCC15"
          cursor={"pointer"}
        />
      </header>

      <div className="mt-10 space-y-10">
        <div className="flex items-center justify-between">
          <BiSolidMessageError
            onClick={() => navigate("/information")}
            size={25}
            color="#FFCC15"
            cursor={"pointer"}
          />

          <UZBTime />
        </div>

        <Tabs
          contentClassName="mt-[20px]"
          tabs={[
            {
              label: "Hisoblangan",
              children: <Hisoblangan />,
            },
            {
              label: "Olingan",
              children: <Olingan />,
            },
          ]}
          defaultTabIndex={0}
        />
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger>
          <Button
            variant={"outline"}
            className="bg-[#FFCC15] rounded-[50%] w-[50px] h-[50px] fixed bottom-32 right-5 hover:bg-[#FFCC15]"
          >
            {" "}
            <FaReply size={35} color="#1C2C57" />{" "}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-[#1C2C57] rounded-t-[20px] border-none">
          <div className="p-4 m-4 mb-10 border-2 border-[#FFCC15] rounded-lg">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="amount"
                className="text-right text-[#FFCC15] font-bold text-[15px]"
              >
                Berilgan pul
              </Label>
              <div className="relative w-full">
                <Input
                  value={amount && MoneyFormatter(amount!)}
                  onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                  id="amount"
                  placeholder="miqdorni kiriting"
                  type="text"
                  className="col-span-3 border-yellow-400 text-black"
                />
              </div>
              <p className="text-white">Balans: 0</p>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleRefundAmountChange}
                type="submit"
                className="bg-[#FFCC15] text-[#1C2C57] mt-5 w-24"
              >
                Yuborish
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
