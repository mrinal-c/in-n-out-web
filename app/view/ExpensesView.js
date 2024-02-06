"use client";
import { useState, useEffect } from "react";
import { ExpenseCell } from "./ExpenseCell";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Button,
  Container,
  Grid,
  CircularProgress,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

export function ExpensesView({ fetchTransactions }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  let user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : {};

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    const data = await fetchTransactions(searchParams.get("month"), user);
    //sort transactions by transactions.date
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setTransactions(data);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Button
        onClick={() => router.push("/home")}
        variant="contained"
        color="error"
      >
        Back
      </Button>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <Grid container spacing={2}>
          {transactions.map((transaction) => (
            <Grid item key={transaction._id} xs={12} sm={6} md={4} lg={3}>
              <ExpenseCell expense={transaction} />
            </Grid>
          ))}
        </Grid>
      </div>

      {loading && (
        <div>
          <CircularProgress size="large" />
        </div>
      )}
    </Container>
  );
}
