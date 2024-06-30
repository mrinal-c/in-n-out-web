// components/TransactionModal.js
"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

export function TransactionModal({
  open,
  handleClose,
  handleSubmit,
  transaction,
}) {
  const [transactionData, setTransactionData] = useState({
    payment: "",
    type: "",
    amount: 0.0,
    description: "",
  });
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (open) {
      setTransactionData(transaction);
      setDate(new Date(transaction.date + "T00:00:00"));
    }
  }, [open]);


  const payments = [
    { label: "Cash", value: "Cash", key: "Cash" },
    { label: "AMEX Card", value: "AMEX Card", key: "AMEX Card" },
    { label: "Citi Card", value: "Citi Card", key: "Citi Card" },
    { label: "Ally Card", value: "Ally Card", key: "Ally Card" },
    { label: "Venmo", value: "Venmo", key: "Venmo" },
  ];
  const types = [
    { label: "Personal", value: "Personal", key: "Personal" },
    { label: "Breakfast", value: "Breakfast", key: "Breakfast" },
    { label: "Lunch", value: "Lunch", key: "Lunch" },
    { label: "Dinner", value: "Dinner", key: "Dinner" },
    { label: "Big Ticket", value: "Big Ticket", key: "Big Ticket" },
    { label: "Groceries", value: "Groceries", key: "Groceries" },
    { label: "Travel", value: "Travel", key: "Travel" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  const invalidTransaction = () => {
    return (
      transactionData.payment === "" ||
      transactionData.type === "" ||
      transactionData.description === "" ||
      transactionData.amount === NaN ||
      transactionData.amount < 0
    );
  };

  return (
    <Modal isOpen={open} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          Add Transaction
          <IconButton
            aria-label="Close modal"
            icon={<CloseIcon />}
            onClick={handleClose}
          />
        </ModalHeader>
        <ModalBody>
          <Box mb={4}>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <SingleDatepicker date={date} onDateChange={setDate} />
            </FormControl>
          </Box>

          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Description"
              name="description"
              value={transactionData.description}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Type</FormLabel>
            <Select
              placeholder="Select type"
              name="type"
              value={transactionData.type}
              onChange={handleChange}
            >
              {types.map((type) => (
                <option key={type.key} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Payment</FormLabel>
            <Select
              placeholder="Select payment method"
              name="payment"
              value={transactionData.payment}
              onChange={handleChange}
            >
              {payments.map((payment) => (
                <option key={payment.key} value={payment.value}>
                  {payment.label}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              placeholder="$$$"
              name="amount"
              value={transactionData.amount}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            isDisabled={invalidTransaction()}
            onClick={() => {
              handleSubmit({
                ...transactionData,
                date: date.toISOString().split("T")[0],
              });
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
