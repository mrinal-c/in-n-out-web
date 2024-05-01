// components/TransactionModal.js
"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  MenuItem,
  Fade,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  IconButton,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Close } from "@mui/icons-material";
//import globals.css
import "../globals.css";

export function TransactionModal({
  open,
  handleClose,
  handleSubmit,
  transaction,
}) {
  const [transactionData, setTransactionData] = useState({
    payment: "",
    type: "",
    price: 0.0,
    description: "",
  });
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    if (transaction && Object.keys(transaction).length !== 0) {
      setTransactionData(transaction);
    }
    if (transaction && transaction.date) {
      setDate(dayjs(transaction.date));
    }
  }, [transaction]);

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

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  const invalidTransaction = () => {
    return (
      transactionData.payment === "" ||
      transactionData.type === "" ||
      transactionData.description === "" ||
      transactionData.price === NaN ||
      transactionData.price < 0
    );
  };

  return (
    <Modal
      open={open}
      closeAfterTransition
      className="flex items-center justify-center h-screen"
    >
      <Fade in={open}>
        <div className="bg-white p-8 w-96">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Add Transaction</h2>
            <IconButton color="inherit" onClick={handleClose}>
              <Close />
            </IconButton>
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Date" value={date} onChange={handleDateChange} />
          </LocalizationProvider>

          <FormControl fullWidth className="mt-5">
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              value={transactionData.description}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth className="mt-5">
            <InputLabel id="type-dropdown-label">Type</InputLabel>
            <Select
              value={transactionData.type}
              label="Type"
              name="type"
              onChange={handleChange}
            >
              {types.map((type) => (
                <MenuItem key={type.key} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth className="mt-5">
            <InputLabel id="payment-dropdown-label">Payment</InputLabel>
            <Select
              value={transactionData.payment}
              label="Payment"
              name="payment"
              onChange={handleChange}
            >
              {payments.map((payment) => (
                <MenuItem key={payment.key} value={payment.value}>
                  {payment.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth className="mt-5">
            <TextField
              id="price"
              name="price"
              type="number"
              label="$$$"
              value={transactionData.price}
              onChange={handleChange}
            />
          </FormControl>

          <div className="mt-4 flex justify-end">
            <Button
              variant="contained"
              color="primary"
              disabled={invalidTransaction()}
              onClick={() => {
                transactionData.date = date.format("YYYY-MM-DD");
                handleSubmit(transactionData);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
