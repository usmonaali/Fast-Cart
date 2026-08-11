import React from "react";
import { getToken } from "../../api/account";
import divMuiBoxroot from "../../assets/divMuiBoxroot.png";
import iconlyglassdiscount from "../../assets/iconlyglassdiscount.png";
import divMuiBoxroot1 from "../../assets/divMuiBoxroot1.png";
import SalesChart from "./SalesChart/SalesChart";
import { Button } from "@mui/material";
import { MoveRight } from "lucide-react";
import divMuiBoxroot2 from "../../assets/divMuiBoxroot2.png";
import { useTranslation } from "react-i18next";


const recentTransactions = [
  {
    name: "Jagarnath S.",
    date: "24.05.2023",
    amount: "$124.97",
    status: "Paid",
  },
  {
    name: "Anand G.",
    date: "23.05.2023",
    amount: "$55.42",
    status: "Pending",
  },
  {
    name: "Kartik S.",
    date: "23.05.2023",
    amount: "$89.90",
    status: "Paid",
  },
  {
    name: "Rakesh S.",
    date: "22.05.2023",
    amount: "$144.94",
    status: "Pending",
  },
  {
    name: "Anup S.",
    date: "22.05.2023",
    amount: "$70.52",
    status: "Paid",
  },
  {
    name: "Jimmy P.",
    date: "22.05.2023",
    amount: "$70.52",
    status: "Paid",
  },
];

const topProductsByUnits = [
  {
    name: "Men Grey Hoodie",
    price: "$49.90",
    units: 204,
  },
  {
    name: "Women Striped T-Shirt",
    price: "$34.90",
    units: 155,
  },
  {
    name: "Wome White T-Shirt",
    price: "$40.90",
    units: 120,
  },
  {
    name: "Men White T-Shirt",
    price: "$49.90",
    units: 204,
  },
  {
    name: "Women Red T-Shirt",
    price: "$34.90",
    units: 155,
  },
];

const StatusBadge = ({ status }) => {
  const isPaid = status === "Paid";
  return (
    <span
      className={`text-[13px] font-[500] px-[10px] py-[2px] rounded-full ${
        isPaid
          ? "bg-[#ECFDF3] text-[#10B981]"
          : "bg-[#F2F4F7] text-[#6C737F] dark:bg-[#1F2937] dark:text-slate-400"
      }`}
    >
      {status}
    </span>
  );
};

const DashBoard = () => {
  const user = getToken();
  const {t} = useTranslation()
  return (
    <div className="min-h-screen bg-white dark:bg-[#0F1729] text-[#111927] dark:text-white transition-colors duration-200">
      <h1 className="font-[700] text-[24px] text-[#111927] dark:text-white ml-[60px] mt-[40px]">
        {t('Dashboard.dashboard')}
      </h1>

      <section className="flex mt-[20px] ml-[60px]">
        <div>
          <div className="flex gap-[10px]">
            <div className="w-[257.6666717529297px] gap-[50px] h-[84px] rounded-[4px] bg-[#FEF3F2] dark:bg-[#111927] flex items-center">
              <div>
                <img
                  src={divMuiBoxroot}
                  className="w-[70px] ml-[20px]"
                  alt=""
                />
              </div>

              <div>
                <span className="font-[400] text-[14px] text-[#111927] dark:text-white">
                  {t('Dashboard.sales')}
                </span>

                <br />

                <h1 className="font-[700] text-[24px] text-[#111927] dark:text-white">
                  $152k
                </h1>
              </div>
            </div>

            <div className="w-[257.6666717529297px] h-[84px] rounded-[4px] items-center gap-[50px] bg-[#FFFAEB] dark:bg-[#111927] flex">
              <div>
                <img
                  className="ml-[20px] w-[70px]"
                  src={iconlyglassdiscount}
                  alt=""
                />
              </div>

              <div>
                <span className="font-[400] text-[14px] text-[#111927] dark:text-white">
                  {t('Dashboard.cost')}
                </span>

                <h1 className="font-[700] text-[24px] text-[#111927] dark:text-white">
                  $99.7k
                </h1>
              </div>
            </div>

            <div className="w-[257.6666717529297px] h-[84px] rounded-[4px] items-center gap-[50px] bg-[#F0FDF9] dark:bg-[#111927] flex">
              <div>
                <img
                  src={divMuiBoxroot1}
                  className="ml-[20px] w-[70px]"
                  alt=""
                />
              </div>

              <div>
                <span className="font-[400] text-[14px] text-[#111927] dark:text-white">
                  {t('Dashboard.profit')}
                </span>

                <h1 className="font-[700] text-[24px] text-[#111927] dark:text-white">
                  $32.1k
                </h1>
              </div>
            </div>
          </div>

          <div>
            <SalesChart />
          </div>
        </div>

        <div className="w-[311px] h-[476.75px] ml-[40px] border border-[2px] border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111927] rounded-[4px]">
          <div className="flex items-center">
            <h1 className="ml-[20px] font-[600] text-[16px] mt-[5px] text-[#111927] dark:text-white">
              {t('Dashboard.topSellingProducts')}
            </h1>

            <Button
              sx={{
                fontWeight: "600",
                fontSize: "13px",
                lineHeight: "22.75px",
                color: "inherit",
                marginTop: "10px",
                marginLeft: "30px",
              }}
              variant="text"
            >
              {t('Dashboard.seeAll')} <MoveRight className="ml-[10px]" />
            </Button>
          </div>

          <div className="flex-col flex gap-[30px]">
            <div className="flex items-center mt-[10px] gap-[20px]">
              <div>
                <img className="ml-[10px]" src={divMuiBoxroot2} alt="" />
              </div>

              <div>
                <h1 className="font-[500] text-[14px] text-[#111927] dark:text-white">
                  Healthcare Erbology
                </h1>

                <p className="font-[400] text-[14px] text-[#6C737F] dark:text-slate-400">
                  in Accessories
                </p>
              </div>

              <div>
                <h1 className="font-[500] text-[14px] text-[#10B981]">
                  13,153
                </h1>

                <p className="font-[400] text-[14px] text-[#6C737F] dark:text-slate-400">
                  in sales
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[20px]">
              <div>
                <img className="ml-[10px]" src={divMuiBoxroot2} alt="" />
              </div>

              <div>
                <h1 className="font-[500] text-[14px] text-[#111927] dark:text-white">
                  Healthcare Erbology
                </h1>

                <p className="font-[400] text-[14px] text-[#6C737F] dark:text-slate-400">
                  in Accessories
                </p>
              </div>

              <div>
                <h1 className="font-[500] text-[14px] text-[#10B981]">
                  13,153
                </h1>

                <p className="font-[400] text-[14px] text-[#6C737F] dark:text-slate-400">
                  in sales
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[20px]">
              <div>
                <img className="ml-[10px]" src={divMuiBoxroot2} alt="" />
              </div>

              <div>
                <h1 className="font-[500] text-[14px] text-[#111927] dark:text-white">
                  Healthcare Erbology
                </h1>

                <p className="font-[400] text-[14px] text-[#6C737F] dark:text-slate-400">
                  in Accessories
                </p>
              </div>

              <div>
                <h1 className="font-[500] text-[14px] text-[#10B981]">
                  13,153
                </h1>

                <p className="font-[400] text-[14px] text-[#6C737F] dark:text-slate-400">
                  in sales
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[20px]">
              <div>
                <img className="ml-[10px]" src={divMuiBoxroot2} alt="" />
              </div>

              <div>
                <h1 className="font-[500] text-[14px] text-[#111927] dark:text-white">
                  Healthcare Erbology
                </h1>

                <p className="font-[400] text-[14px] text-[#6C737F] dark:text-slate-400">
                  in Accessories
                </p>
              </div>

              <div>
                <h1 className="font-[500] text-[14px] text-[#10B981]">
                  13,153
                </h1>

                <p className="font-[400] text-[14px] text-[#6C737F] dark:text-slate-400">
                  in sales
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[20px]">
              <div>
                <img className="ml-[10px]" src={divMuiBoxroot2} alt="" />
              </div>

              <div>
                <h1 className="font-[500] text-[14px] text-[#111927] dark:text-white">
                  Healthcare Erbology
                </h1>

                <p className="font-[400] text-[14px] text-[#6C737F] dark:text-slate-400">
                  in Accessories
                </p>
              </div>

              <div>
                <h1 className="font-[500] text-[14px] text-[#10B981]">
                  13,153
                </h1>

                <p className="font-[400] text-[14px] text-[#6C737F] dark:text-slate-400">
                  in sales
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ml-[60px] flex mt-[40px]">
        <div>
          <div className="w-[579px] h-[380px] rounded-[4px] border border-gray-50 dark:border-[#1F2937] bg-white dark:bg-[#111927]">
            <h1 className="font-[600] mt-[10px] ml-[10px] text-[16px] text-[#131523] dark:text-white">
              {t('Dashboard.recentTransactions')}
            </h1>

            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="font-[400] text-[13px] text-[#6C737F] dark:text-slate-400 pb-[10px]">
                    {t('Dashboard.name')}
                  </th>

                  <th className="font-[400] text-[13px] text-[#6C737F] dark:text-slate-400 pb-[10px]">
                    {t('Dashboard.date')}
                  </th>

                  <th className="font-[400] text-[13px] text-[#6C737F] dark:text-slate-400 pb-[10px]">
                    {t('Dashboard.amount')}
                  </th>

                  <th className="font-[400] text-[13px] text-[#6C737F] dark:text-slate-400 pb-[10px]">
                    {t('Dashboard.status')}
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentTransactions.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-[#F2F4F7] dark:border-[#1F2937]"
                  >
                    <td className="py-[10px] font-[500] text-[14px] pt-[20px] text-[#111927] dark:text-white">
                      {row.name}
                    </td>

                    <td className="py-[10px] text-[14px] text-[#000205] dark:text-slate-400">
                      {row.date}
                    </td>

                    <td className="py-[10px] text-[14px] text-[#6C737F] dark:text-slate-400">
                      {row.amount}
                    </td>

                    <td className="py-[10px]">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ml-[30px]">
          <div className="w-[539px] h-[380px] rounded-[4px] border border-gray-50 dark:border-[#1F2937] bg-white dark:bg-[#111927]">
            <h1 className="font-[600] text-[16px] text-[#131523] dark:text-white mt-[10px] ml-[10px]">
              {t('Dashboard.topProductsByUnitsSold')}
            </h1>

            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="font-[400] text-[13px] text-[#6C737F] dark:text-slate-400 pb-[10px]">
                    {t('Dashboard.name')}
                  </th>

                  <th className="font-[400] text-[13px] text-[#6C737F] dark:text-slate-400 pb-[10px]">
                    {t('Dashboard.price')}
                  </th>

                  <th className="font-[400] text-[13px] text-[#6C737F] dark:text-slate-400 pb-[10px]">
                    {t('Dashboard.units')}
                  </th>
                </tr>
              </thead>

              <tbody>
                {topProductsByUnits.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-[#F2F4F7] dark:border-[#1F2937]"
                  >
                    <td className="py-[10px] flex items-center gap-[10px] mt-[15px]">
                      <span className="w-[24px] h-[24px] rounded-[4px] bg-[#F2F4F7] dark:bg-[#1F2937] inline-block" />

                      <span className="font-[500] text-[14px] text-[#111927] dark:text-white">
                        {row.name}
                      </span>
                    </td>

                    <td className="py-[10px] text-[14px] text-[#6C737F] dark:text-slate-400">
                      {row.price}
                    </td>

                    <td className="py-[10px] text-[14px] text-[#6C737F] dark:text-slate-400">
                      {row.units}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
