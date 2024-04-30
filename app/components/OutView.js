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

export function OutView({
  defaultMonth,
  defaultYear,
  getTableData,
  changeYear,
  addOut,
}) {
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState({});
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const user = session?.user;

  useEffect(() => {
    reload();
  }, [month, year, status]);

  const reload = async () => {
    setLoading(true);
    //wait for user to be defined
    if (!user) {
      return;
    }
    const data = await getTableData(month, user);
    setTableData(data);
    setLoading(false);
  };

  const handleMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleYear = async (event) => {
    setLoading(true);
    setYear(event.target.value);
    await changeYear(event.target.value, user);
    setLoading(false);
  };

  const handleSubmitOut = async (transaction) => {
    setModalVisible(false);
    let success = await addOut(transaction, user, month);
    if (success) {
      reload();
    } else {
      alert("Failed to add transaction");
    }
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

  return loading ? (
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

      {Object.keys(tableData).length > 0 ? (
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
        handleSubmit={(transaction) => {
          handleSubmitOut(transaction);
        }}
        transaction={{payment: 'AMEX Card', type: "", price: 0.00, description: ""}}
      />
    </Container>
  );
}
