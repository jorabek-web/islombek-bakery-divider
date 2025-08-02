import { Loader, Title } from "@/components"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useBakeryQuery } from "@/integration";
import { useState } from "react";

import { IoIosArrowDown } from "react-icons/io";


export const ChooseBranch = () => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const { data: bakery, isLoading } = useBakeryQuery({})

    const handleClick = (id: string, bakeryName: string) => {
        localStorage.setItem("currentBakery", JSON.stringify({ id, bakeryName }))
        setName(name)
        setOpen(false)  
    }

    const bakeryName = JSON.parse(localStorage.getItem("currentBakery") || "{}")

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="mx-auto flex items-center gap-3 text-white">
                <Title text={bakeryName?.bakeryName} />
                <IoIosArrowDown size={20} />
            </SheetTrigger>
            <SheetContent
                side="bottom"
                className="bg-[#1C2C57] border-none rounded-t-[20px]">
                <SheetHeader className="grid grid-cols-1 gap-y-3 w-full pt-[40px]">
                    {isLoading && <Loader className="mx-auto size-[40px]" />}
                    {bakery?.map((item) => (
                        <div key={item?._id} className="py-[4px] px-[12px] flex items-center gap-[22px] bg-white rounded-[8px]" onClick={() => handleClick(item?._id, item?.title)}>
                            <img src={item?.image} alt={item?.title} loading="lazy" className="w-[40px] h-[40px] rounded-full" />
                            <p className="text-[#1C2C57] text-[16px] font-semibold">{item?.title}</p>
                        </div>
                    ))}
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}