// components/TransactionModal.js
"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Close } from "@mui/icons-material";

export function TransactionModal({ open, handleClose, handleSubmit }) {
  const [transactionData, setTransactionData] = useState({});
  const [date, setDate] = useState(dayjs());

  const handleDateChange = (newDate) => {
    setDate(newDate)
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
            <DatePicker
              label="Date"
              value={date}
              onChange={handleDateChange}
            />
          </LocalizationProvider>

          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            label="Type"
            name="type"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            label="Payment"
            name="payment"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

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
                transactionData.date = date.format('YYYY-MM-DD')
                handleSubmit(transactionData)
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
