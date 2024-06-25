"use client";
import { useState, useEffect } from "react";
import { ExpenseCell } from "./ExpenseCell";
import {
  Box,
  Button,
  Input,
  Grid,
  GridItem,
  Container,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { TransactionModal } from "../components/TransactionModal";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";
import {
  fetchTransactions,
  editTransaction,
  deleteTransaction,
} from "@/redux/slices/expensesSlice";

export function ExpensesView() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.expense.expenses);
  const [transactionToEdit, setTransactionToEdit] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchTransactions({ user: user }));
    }
  }, [isLoggedIn]);

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
    <Container mt="50px" pl="50px" pr="50px" maxW="full">
      <Flex justifyContent="space-between" mb={4}>
        <Button colorScheme="red" onClick={() => router.push("/home")} mr="1rem">
          Back
        </Button>
        <Input
          id="outlined-basic"
          placeholder="Filter"
          value={searchText}
          onChange={handleSearch}
          variant="outline"
        />
      </Flex>
      {/* <Box mt="20px" display="flex" justifyContent="center"> */}
      <SimpleGrid minChildWidth="200px" spacing={4}>
        {filterTransactions(transactions).map((transaction) => (
          <Box key={transaction._id} maxW="500px">
            <ExpenseCell
              expense={transaction}
              deleteTransaction={deleteHelper}
              openEditModal={openEditModal}
            />
          </Box>
        ))}
      </SimpleGrid>
      {/* </Box> */}
      <TransactionModal
        open={modalVisible}
        handleClose={() => setModalVisible(false)}
        handleSubmit={editHelper}
        transaction={transactionToEdit}
      />
    </Container>
  );
}
