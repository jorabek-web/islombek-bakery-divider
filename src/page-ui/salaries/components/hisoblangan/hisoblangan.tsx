import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../../../components/ui/table";
import { useGetMoneyAccruedQuery } from "@/integration";
import { MoneyFormatter } from "../../../../utils";
import { useEffect } from "react";

export const Hisoblangan = () => {
  const userId = localStorage.getItem("userId");
  const { data: salaries, refetch } = useGetMoneyAccruedQuery({
    id: userId || "",
  });

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId]);

  return (
    <div>
      <div className="flex items-center justify-between gap-5 my-2">
        <span className="text-[#FFCC15] text-[14px] font-bold px-4">
          Ish haqqi
        </span>
        <span className="text-[#FFCC15] text-[14px] font-bold px-4 w-24">
          Sana
        </span>
      </div>

      <div className="bg-white rounded-2xl border-2 border-[#FFCC15]">
        <Table>
          <TableBody>
            {salaries && salaries.length ? (
              salaries?.map((salary) => (
                <TableRow
                  key={salary._id}
                  className="h-10 hover:bg-transparent border-b border-b-[#FFCC15] flex items-center justify-between"
                >
                  <TableCell className="font-bold text-[14px] text-[#1C2C57] p-2 px-4 w-1/2">
                    {MoneyFormatter(salary.amount)} sum
                  </TableCell>
                  <TableCell className="font-bold text-[14px] text-[#1C2C57] p-2 px-4 w-1/2 text-right">
                    {dayjs(salary.createdAt).format("MM.DD.YYYY")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="h-10 hover:bg-transparent border-b border-b-[#FFCC15] flex items-center justify-between">
                <TableCell className="font-bold text-[14px] text-[#1C2C57] p-2 px-4 w-1/2">
                  mavjud emas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
