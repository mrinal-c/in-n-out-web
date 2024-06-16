"use client";
import { useState, useEffect } from "react";
import { ExpenseCell } from "./ExpenseCell";
import {
  Button,
  Container,
  Grid,
  CircularProgress,
  TextField,
} from "@mui/material";
import { TransactionModal } from "../components/TransactionModal";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";
import { fetchTransactions, editTransaction, deleteTransaction } from "@/redux/slices/expensesSlice";

export function ExpensesView() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.expense.expenses);
  const [transactionToEdit, setTransactionToEdit] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
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
      dispatch(fetchTransactions({ user: user }));
    }
  }, [status]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filterTransactions = () => {
    if (searchText == "") {
      return transactions;
    }
    return transactions.filter((transaction) => {
      return (
        transaction.description
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        transaction.price.toString().includes(searchText) ||
        transaction.payment.toLowerCase().includes(searchText.toLowerCase()) ||
        transaction.date.toLowerCase().includes(searchText.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  };

  const deleteHelper = (transaction) => {
    dispatch(deleteTransaction({ transaction: transaction, user: user }));
  };

  const openEditModal = (transaction) => {
    setTransactionToEdit(transaction);
    setModalVisible(true);
  };

  const editHelper = (transaction) => {
    dispatch(editTransaction({ transaction: transaction, user: user }));
    setModalVisible(false);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <div className="flex justify-between">
        <Button
          onClick={() => router.push("/")}
          variant="contained"
          color="error"
        >
          Back
        </Button>
        <TextField
          id="outlined-basic"
          label="Filter"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <Grid container spacing={2}>
          {filterTransactions(transactions).map((transaction) => (
            <Grid item key={transaction._id} xs={12} sm={6} md={4} lg={3}>
              <ExpenseCell
                expense={transaction}
                deleteTransaction={deleteHelper}
                openEditModal={openEditModal}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <TransactionModal
        open={modalVisible}
        handleClose={() => {
          setModalVisible(false);
        }}
        handleSubmit={editHelper}
        transaction={transactionToEdit}
      />
    </Container>
  );
}
