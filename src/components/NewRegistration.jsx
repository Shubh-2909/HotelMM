import React, { useState, useEffect } from "react";
import axios from "axios";

const NewRegistration = () => {
  const [Useremail, setUseremail] = useState("");
  const [selectedEntryTime, setSelectedEntryTime] = useState("");
  const [selectedExitTime, setSelectedExitTime] = useState("");
  const [diffinMin, setDiffinMin] = useState(0);
  const [entryDate, setEntryDate] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [price, setPrice] = useState(0);
  const [requestStatus, setRequestStatus] = useState(null);

  const handleTimeentry = (event) => {
    setSelectedEntryTime(event.target.value);
  };

  const handleUseremail = (event) => {
    setUseremail(event.target.value);
  };

  const handleTimeexit = (event) => {
    const exitTimeValue = event.target.value;
    setSelectedExitTime(exitTimeValue);
  };

  const handleDateEntry = (event) => {
    setEntryDate(event.target.value);
  };

  const handleDateExit = (event) => {
    setExitDate(event.target.value);
  };

  useEffect(() => {
    const calculatePrice = () => {
      if (
        selectedEntryTime &&
        selectedExitTime &&
        entryDate &&
        exitDate &&
        (a || b || c)
      ) {
        const entryTime = new Date(`${entryDate}T${selectedEntryTime}:00`);
        const exitTime = new Date(`${exitDate}T${selectedExitTime}:00`);
        const differenceInMs = Math.abs(
          entryTime.getTime() - exitTime.getTime()
        );
        const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));

        let perMinuteRate = 0;
        if (a) {
          perMinuteRate = 100;
        } else if (b) {
          perMinuteRate = 80;
        } else if (c) {
          perMinuteRate = 50;
        }

        const calculatedPrice = differenceInMinutes * (perMinuteRate / 60);
        setDiffinMin(differenceInMinutes);
        setPrice(calculatedPrice);
        console.log(`Time difference: ${differenceInMinutes} minutes`);
      }
    };

    calculatePrice();
  }, [a, b, c, selectedEntryTime, selectedExitTime, entryDate, exitDate]);

  const setzerostate = () => {
    setA("");
    setB("");
    setC("");
  };

  const submitdata = () => {
    const data = {};
    if (Useremail) data.userEmail = Useremail;
    const startTime = new Date(`${entryDate}T${selectedEntryTime}:00Z`);
    data.startTime = startTime.toISOString();
    const endTime = new Date(`${exitDate}T${selectedExitTime}:00Z`);
    data.endTime = endTime.toISOString();
    if (price) data.totalPrice = price;
    if (a) {
      data.roomNumber = a;
      data.roomType = "A";
    }
    if (b) {
      data.roomNumber = b;
      data.roomType = "B";
    }
    if (c) {
      data.roomNumber = c;
      data.roomType = "C";
    }

    const preliminaryCheckData = {
      startTime: data.startTime,
      endTime: data.endTime,
      roomNumber: data.roomNumber,
    };

    axios
      .post("https://alcor.onrender.com/api/checkBooking", preliminaryCheckData)
      .then((preliminaryResponse) => {
        const isRoomAvailable = preliminaryResponse.data.available;

        if (!isRoomAvailable) {
          axios
            .post("https://alcor.onrender.com/api/booking", data)
            .then((response) => {
              console.log("Post request successful", response);
              setRequestStatus("success");
            })
            .catch((error) => {
              console.error("Error making POST request", error);
              setRequestStatus("error");
            });
        } else {
          alert(
            "Room is already booked. Please choose another room or time slot."
          );
        }
      })
      .catch((error) => {
        console.error("Error checking for room availability", error);
        setRequestStatus("error");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form style={{ width: "50%", marginTop: "1rem" }}>
        <h1 className="text-xl font-bold mb-4">Room Allotment</h1>
        <label>Email</label>
        <input
          type="email"
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          value={Useremail}
          onChange={handleUseremail}
        />
        <label>Entry Date</label>
        <input
          type="date"
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          value={entryDate}
          onChange={handleDateEntry}
        />
        <label>Entry Time</label>
        <input
          type="time"
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          value={selectedEntryTime}
          onChange={handleTimeentry}
        />
        <label>Exit Date</label>
        <input
          type="date"
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          value={exitDate}
          onChange={handleDateExit}
        />
        <label>Exit Time</label>
        <input
          type="time"
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          value={selectedExitTime}
          onChange={handleTimeexit}
        />
      </form>
      <div className="flex gap-8">
        <div className="flex gap-2 items-center">
          <label>A</label>
          <select
            value={a}
            onChange={(event) => setA(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-28 cursor-pointer"
          >
            <option value="">Choose</option>
            <option value="a1">A1</option>
            <option value="a2">A2</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label>B</label>
          <select
            value={b}
            onChange={(event) => setB(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-28 cursor-pointer"
          >
            <option value="">Choose</option>
            <option value="b1">B1</option>
            <option value="b2">B2</option>
            <option value="b3">B3</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label>C</label>
          <select
            value={c}
            onChange={(event) => setC(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2  w-28 cursor-pointer"
          >
            <option value="">Choose</option>
            <option value="c1">C1</option>
            <option value="c2">C2</option>
            <option value="c3">C3</option>
            <option value="c4">C4</option>
            <option value="c5">C5</option>
          </select>
        </div>
      </div>
      <div className="my-5 flex flex-col gap-3">
        <p className="font-bold ">Total Price: {price}</p>
        <button
          type="submit"
          onClick={submitdata}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40"
        >
          Proceed
        </button>
        {requestStatus === "success" && (
          <p className="text-green-500">Room Booked Successfully</p>
        )}

        {requestStatus === "error" && (
          <p className="text-red-500">
            Error making request. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default NewRegistration;
