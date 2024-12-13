"use client";
import { useState, useEffect } from "react";
import { ExpenseCell } from "./ExpenseCell";

import { TransactionModal } from "./TransactionModal";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch, useAppStore } from "../../redux/hooks";
import { editTransaction, getTransactions, deleteTransaction } from "../../redux/slices/expensesSlice";


export function ExpensesView() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.expense.expenses);
  const [transactionToEdit, setTransactionToEdit] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const user = useAppSelector((state) => state.user.user);

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
        transaction.amount.toString().includes(searchText) ||
        transaction.payment.toLowerCase().includes(searchText.toLowerCase()) ||
        transaction.date.toLowerCase().includes(searchText.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  };

  const deleteHelper = (transaction) => {
    dispatch(deleteTransaction({ transaction }));
  };

  const openEditModal = (transaction) => {
    setTransactionToEdit(transaction);
    setModalVisible(true);
  };

  const editHelper = (transaction) => {
    dispatch(editTransaction({ transaction }));
    setModalVisible(false);
  };

  return (
    <div></div>
    // <Container mt="50px" pl="50px" pr="50px" maxW="full">
    //   <Flex justifyContent="space-between" mb={4}>
    //     <Button colorScheme="red" onClick={() => router.push("/home")} mr="1rem">
    //       Back
    //     </Button>
    //     <Input
    //       id="outlined-basic"
    //       placeholder="Filter"
    //       value={searchText}
    //       onChange={handleSearch}
    //       variant="outline"
    //     />
    //   </Flex>
    //   {/* <Box mt="20px" display="flex" justifyContent="center"> */}
    //   <SimpleGrid minChildWidth="200px" spacing={4}>
    //     {filterTransactions(transactions).map((transaction) => (
    //       <Box key={transaction._id} maxW="500px">
    //         <ExpenseCell
    //           expense={transaction}
    //           deleteTransaction={deleteHelper}
    //           openEditModal={openEditModal}
    //         />
    //       </Box>
    //     ))}
    //   </SimpleGrid>
    //   {/* </Box> */}
    //   <TransactionModal
    //     open={modalVisible}
    //     handleClose={() => setModalVisible(false)}
    //     handleSubmit={editHelper}
    //     transaction={transactionToEdit}
    //   />
    // </Container>
  );
}
