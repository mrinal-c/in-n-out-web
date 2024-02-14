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

export function TransactionModal({ open, handleClose, handleSubmit }) {
  const [transactionData, setTransactionData] = useState({payment: "AMEX Card", type: "Personal"});
  const [date, setDate] = useState(dayjs());

  const payments = [
    { label: "Cash", value: "Cash", key: "Cash" },
    { label: "AMEX Card", value: "AMEX Card", key: "AMEX Card" },
    { label: "Citi Card", value: "Citi Card", key: "Citi Card" },
    { label: "Debit Card", value: "Debit Card", key: "Debit Card" },
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

          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <FormControl fullWidth className="mt-2">
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

          <FormControl fullWidth margin="normal">
            <TextField
              id="price"
              name="price"
              type="number"
              label="$$$"
              onChange={handleChange}
            />
          </FormControl>

          <div className="mt-4 flex justify-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                transactionData.date = date.format("YYYY-MM-DD");
                handleSubmit(transactionData);
              }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClose}
              className="ml-2"
            >
              Close
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
