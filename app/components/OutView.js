"use client";

import { ExpenseTable } from "./ExpenseTable";
import { TransactionModal } from "./TransactionModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch, useAppStore } from "../../redux/hooks";
import { getTransactions, addOut } from "../../redux/slices/expensesSlice";
import { setMonth, setYear } from "../../redux/slices/dateSlice";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function OutView() {
  //hooks
  const dispatch = useAppDispatch();
  const router = useRouter();

  //redux state
  const tableData = useAppSelector((state) => state.expense.tableData);
  const { month, year } = useAppSelector((state) => state.date);

  //local state
  const [modalVisible, setModalVisible] = useState(false);

  //fetch transactions on page load and when month/year change
  useEffect(() => {
    dispatch(getTransactions());
  }, [month, year]);

  const handleMonth = (event) => {
    dispatch(setMonth(event.target.value));
  };

  const handleYear = (event) => {
    dispatch(setYear(event.target.value));
  };

  const handleSubmitOut = (transaction) => {
    setModalVisible(false);
    dispatch(addOut({ transaction }));
  };

  const viewTransactions = () => {
    router.push("/view");
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const years = ["2024"]

  return (
    <div className="h-screen p-10">
      <div className="flex gap-2">
        <Select defaultValue={month}>
          <SelectTrigger>
            <SelectValue>{month}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>{month}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue={year}>
          <SelectTrigger>
            <SelectValue>{year}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
    // <Container maxW="sm" mt="50px">
    //   <div
    //     style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
    //   >
    //     <FormControl>
    //       <FormLabel id="month-dropdown-label">Month</FormLabel>
    //       <Select
    //         value={month}
    //         onChange={handleMonth}
    //         placeholder="Select month"
    //       >
    //         {months.map((month) => (
    //           <option key={month.key} value={month.value}>
    //             {month.label}
    //           </option>
    //         ))}
    //       </Select>
    //     </FormControl>

    //     <FormControl>
    //       <FormLabel id="year-dropdown-label">Year</FormLabel>
    //       <Select value={year} onChange={handleYear} placeholder="Select year">
    //         {years.map((year) => (
    //           <option key={year.key} value={year.value}>
    //             {year.label}
    //           </option>
    //         ))}
    //       </Select>
    //     </FormControl>
    //   </div>

    //   {tableData && Object.keys(tableData).length > 0 ? (
    //     <ExpenseTable amounts={tableData} />
    //   ) : (
    //     <CircularProgress isIndeterminate size="small" />
    //   )}

    //   <div
    //     style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
    //   >
    //     <Button
    //       onClick={() => setModalVisible(true)}
    //       colorScheme="green"
    //       mr={5}
    //       isDisabled={!month}
    //     >
    //       Add
    //     </Button>

    //     <Button
    //       onClick={viewTransactions}
    //       colorScheme="red"
    //       isDisabled={!month}
    //     >
    //       View
    //     </Button>
    //   </div>

    //   <TransactionModal
    //     open={modalVisible}
    //     handleClose={() => setModalVisible(false)}
    //     handleSubmit={handleSubmitOut}
    //     transaction={{
    //       payment: "",
    //       type: "",
    //       amount: 0.0,
    //       description: "",
    //       date: new Date().toISOString().split("T")[0]
    //     }}
    //   />
    // </Container>
  );
}
