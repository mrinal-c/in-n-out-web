"use client";
import {
  Button,
  Container,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { ExpenseTable } from "./ExpenseTable";
import { TransactionModal } from "./TransactionModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";
import { getTableData, addOut } from "@/redux/slices/expensesSlice";
import { setMonth, changeYear } from "@/redux/slices/dateSlice";

export function OutView() {
  const tableData = useAppSelector((state) => state.expense.tableData);
  const dispatch = useAppDispatch();
  const month = useAppSelector((state) => state.date.month);
  const year = useAppSelector((state) => state.date.year);
  const [modalVisible, setModalVisible] = useState(false);
  const error = useAppSelector((state) => state.expense.error);
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const user = session?.user;

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(changeYear({ year: year, user: user }));
      dispatch(getTableData({ user: user }));
    }
  }, [status, month, year]);


  const handleMonth = (event) => {
    dispatch(setMonth(event.target.value));
  };

  const handleYear = (event) => {
    dispatch(changeYear({year: event.target.value, user: user}));
  };

  const handleSubmitOut = (transaction) => {
    setModalVisible(false);
    dispatch(addOut({ transaction: transaction, user: user }));
  };

  const viewTransactions = () => {
    router.push("/view?month=" + month);
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

  return false ? (
    <div>
      <CircularProgress size="large" />
    </div>
  ) : (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <FormControl fullWidth>
          <InputLabel id="month-dropdown-label">Month</InputLabel>
          <Select value={month} label="Month" onChange={handleMonth}>
            {months.map((month) => (
              <MenuItem key={month.key} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="year-dropdown-label">Year</InputLabel>
          <Select value={year} label="Year" onChange={handleYear}>
            {years.map((year) => (
              <MenuItem key={year.key} value={year.value}>
                {year.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {tableData != undefined && Object.keys(tableData).length > 0 ? (
        <ExpenseTable amounts={tableData} />
      ) : (
        <CircularProgress size="large" />
      )}

      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <Button
          onClick={() => setModalVisible(true)}
          variant="contained"
          color="success"
          className="mr-5"
          disabled={month === ""}
        >
          Add
        </Button>

        <Button
          onClick={viewTransactions}
          variant="contained"
          color="error"
          disabled={month === ""}
        >
          View
        </Button>
      </div>

      <TransactionModal
        open={modalVisible}
        handleClose={() => {
          setModalVisible(false);
        }}
        handleSubmit={handleSubmitOut}
      />
    </Container>
  );
}
