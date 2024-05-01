"use client";
import { useState, useEffect } from "react";
import { ExpenseCell } from "./ExpenseCell";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Button,
  Container,
  Grid,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { TransactionModal } from "../components/TransactionModal";

export function ExpensesView({
  fetchTransactions,
  deleteTransaction,
  editTransaction,
}) {
  const [transactions, setTransactions] = useState([]);
  const [transactionToEdit, setTransactionToEdit] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const user = session?.user;

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    const data = await fetchTransactions(searchParams.get("month"), user);
    //sort transactions by transactions.date
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setTransactions(data);
  };

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
    deleteTransaction(transaction, searchParams.get("month"), user);
    getTransactions();
  };

  const openEditModal = (transaction) => {
    setTransactionToEdit(transaction);
    setModalVisible(true);
  };

  const editHelper = (transaction) => {
    editTransaction(transaction, searchParams.get("month"), user);
    getTransactions();
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

      {loading && (
        <div>
          <CircularProgress size="large" />
        </div>
      )}
    </Container>
  );
}
