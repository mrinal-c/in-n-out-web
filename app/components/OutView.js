"use client";
import {
  Container,
  Select,
  FormControl,
  FormLabel,
  Button,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ExpenseTable } from "./ExpenseTable";
import { TransactionModal } from "./TransactionModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";
import { getTransactions, addOut } from "@/redux/slices/expensesSlice";
import { setMonth, setYear } from "@/redux/slices/dateSlice";

export function OutView() {
  const tableData = useAppSelector((state) => state.expense.tableData);
  const dispatch = useAppDispatch();
  const month = useAppSelector((state) => state.date.month);
  const year = useAppSelector((state) => state.date.year);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

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
    { label: "Jan", value: "Jan", key: "Jan" },
    { label: "Feb", value: "Feb", key: "Feb" },
    { label: "Mar", value: "Mar", key: "Mar" },
    { label: "Apr", value: "Apr", key: "Apr" },
    { label: "May", value: "May", key: "May" },
    { label: "Jun", value: "Jun", key: "Jun" },
    { label: "Jul", value: "Jul", key: "Jul" },
    { label: "Aug", value: "Aug", key: "Aug" },
    { label: "Sep", value: "Sep", key: "Sep" },
    { label: "Oct", value: "Oct", key: "Oct" },
    { label: "Nov", value: "Nov", key: "Nov" },
    { label: "Dec", value: "Dec", key: "Dec" },
  ];

  const years = [
    { label: "2023", value: "2023", key: "2023" },
    { label: "2024", value: "2024", key: "2024" },
  ];

  return (
    <Container maxW="sm" mt="50px">
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <FormControl>
          <FormLabel id="month-dropdown-label">Month</FormLabel>
          <Select
            value={month}
            onChange={handleMonth}
            placeholder="Select month"
          >
            {months.map((month) => (
              <option key={month.key} value={month.value}>
                {month.label}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel id="year-dropdown-label">Year</FormLabel>
          <Select value={year} onChange={handleYear} placeholder="Select year">
            {years.map((year) => (
              <option key={year.key} value={year.value}>
                {year.label}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>

      {tableData && Object.keys(tableData).length > 0 ? (
        <ExpenseTable amounts={tableData} />
      ) : (
        <CircularProgress isIndeterminate size="small" />
      )}

      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <Button
          onClick={() => setModalVisible(true)}
          colorScheme="green"
          mr={5}
          isDisabled={!month}
        >
          Add
        </Button>

        <Button
          onClick={viewTransactions}
          colorScheme="red"
          isDisabled={!month}
        >
          View
        </Button>
      </div>

      <TransactionModal
        open={modalVisible}
        handleClose={() => setModalVisible(false)}
        handleSubmit={handleSubmitOut}
        transaction={{
          payment: "",
          type: "",
          amount: 0.0,
          description: "",
          date: new Date().toISOString().split("T")[0]
        }}
      />
    </Container>
  );
}
