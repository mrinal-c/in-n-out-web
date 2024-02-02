"use client";
import { useState, useEffect } from "react";
import { ExpenseCell } from "./ExpenseCell";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Button,
  Container,
  Grid,
  Typography,
  Modal,
  CircularProgress,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

export function ExpensesView({ fetchTransactions }) {
  const [transactions, setTransactions] = useState([]);
  const searchParams = useSearchParams()
  const router = useRouter()
  let user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user")) : {};

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    const data = await fetchTransactions(searchParams.get('month'), user);
    setTransactions(data);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
        <Button
          onClick={() => router.push('/home')}
          variant="contained"
          color="error"
        >
          Back
        </Button>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        {transactions.map((transaction) => (
          <ExpenseCell key={transaction._id} expense={transaction} />
        ))}
      </div>
    </Container>
  );
}
