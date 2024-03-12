import React, { useState } from "react";
import axios from "axios";

const Edit = () => {
  const [Useremail, setEmail] = useState("");
  const [Usernewemail, setnewEmail] = useState("");
  const [startTime, setselectedEntryTime] = useState("");
  const [endTime, setselectedExitTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, settotalPrice] = useState("");
  const [roomNumber, setroomNo] = useState("");
  const [roomType, setroomType] = useState("");
  const [requestStatus, setRequestStatus] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlenewEmailChange = (event) => {
    setnewEmail(event.target.value);
  };

  const handleTimeentry = (event) => {
    setselectedEntryTime(event.target.value);
  };

  const handleTimeexit = (event) => {
    setselectedExitTime(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleRoom = (event) => {
    setroomNo(event.target.value);
  };

  const handleRoomType = (event) => {
    setroomType(event.target.value);
  };

  const handleTotalPrice = (event) => {
    settotalPrice(event.target.value);
  };

  const handleCheckClick = () => {
    axios
      .post(`https://alcor.onrender.com/api/bookigDetails`, {
        userEmail: Useremail,
      })
      .then((response) => {
        const userData = response.data.data;
        const dateTimeS = new Date(userData.startTime);

        const dateS = dateTimeS.toISOString().split("T")[0];
        const timeS = dateTimeS.toTimeString().split(" ")[0];

        const dateTimeE = new Date(userData.startTime);

        const dateE = dateTimeE.toISOString().split("T")[0];
        const timeE = dateTimeE.toTimeString().split(" ")[0];
        setselectedEntryTime(timeS || "");
        setselectedExitTime(timeE || "");
        setStartDate(dateS || "");
        setEndDate(dateE || "");
        settotalPrice(userData.totalPrice || "");
        setroomNo(userData.roomNumber || "");
        setroomType(userData.roomType || "");
        console.log("fetched the data");
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error making POST request", error);
      });
  };

  const finalprice = () => {
    const entryDateTime = new Date(`${startDate}T${startTime}`);
    const exitDateTime = new Date(`${endDate}T${endTime}`);

    // Calculate total minutes spent
    const totalMinutesSpent = Math.round(
      (exitDateTime - entryDateTime) / (1000 * 60)
    );

    // Determine room type price
    let roomTypePrice;
    switch (roomType) {
      case "A":
        roomTypePrice = 100;
        break;
      case "B":
        roomTypePrice = 80;
        break;
      case "C":
        roomTypePrice = 50;
        break;
      default:
        roomTypePrice = 0; // Default price if room type is not A, B, or C
    }

    // Calculate total price
    const totalPrice = (totalMinutesSpent / 60) * roomTypePrice;

    // Update the state with the calculated total price
    settotalPrice(totalPrice.toFixed(2)); // Assuming you want to keep it as a string with two decimal places
  };

  const handleEditClick = () => {
    const data = {};
    if (Usernewemail) data.userEmail = Usernewemail;

    if (startTime) {
      const [hours, minutes] = startTime.split(":");
      const startDateTime = new Date();
      startDateTime.setHours(hours, minutes, 0, 0);
      data.startTime = startDateTime.toISOString();
    }

    if (endTime) {
      const [hours, minutes] = endTime.split(":");
      const endDateTime = new Date();
      endDateTime.setHours(hours, minutes, 0, 0);
      data.endTime = endDateTime.toISOString();
    }

    if (startDate) {
      const startDateObj = new Date(startDate);
      data.startDate = startDateObj.toISOString().split("T")[0];
    }

    if (endDate) {
      const endDateObj = new Date(endDate);
      data.endDate = endDateObj.toISOString().split("T")[0];
    }

    if (totalPrice) data.totalPrice = totalPrice;
    if (roomNumber) data.roomNumber = roomNumber;
    if (roomType) data.roomType = roomType;

    axios
      .patch(
        `https://alcor.onrender.com/api/booking?userEmail=${Useremail}`,
        data
      )
      .then((response) => {
        console.log("PATCH request successful", response);
        setRequestStatus("success");
      })
      .catch((error) => {
        console.error("Error making PATCH request", error);
        setRequestStatus("error");
      });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex gap-3 w-full items-center">
            <label style={{ width: "150px" }}>Email</label>
            <input
              required
              type="email"
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:border-blue-500"
              value={Useremail}
              onChange={handleEmailChange}
            />
          </div>
          <button
              onClick={handleCheckClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
            >
              Check
            </button>

          <div className="flex gap-3 w-full items-center">
            <label style={{ width: "150px" }}>New Email</label>
            <input
              required
              type="email"
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:border-blue-500"
              value={Usernewemail}
              onChange={handlenewEmailChange}
            />
          </div>

          <div className="flex gap-3 w-full items-center">
            <label style={{ width: "150px" }}>Start Time</label>
            <input
              type="time"
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:border-blue-500"
              value={startTime}
              onChange={handleTimeentry}
            />
          </div>

          <div className="flex gap-3 w-full items-center">
            <label style={{ width: "150px" }}>End Time</label>
            <input
              type="time"
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:border-blue-500"
              value={endTime}
              onChange={handleTimeexit}
            />
          </div>

          <div className="flex gap-3 w-full items-center">
            <label style={{ width: "150px" }}>Start Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:border-blue-500"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>

          <div className="flex gap-3 w-full items-center">
            <label style={{ width: "150px" }}>End Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:border-blue-500"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>

          <div className="flex gap-3 w-full items-center">
            <label style={{ width: "150px" }}>Room Number</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:border-blue-500"
              value={roomNumber}
              onChange={handleRoom}
            />
          </div>

          <div className="flex gap-3 w-full items-center">
            <label style={{ width: "150px" }}>Room Type</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:border-blue-500"
              value={roomType}
              onChange={handleRoomType}
            />
          </div>

          <div className="flex gap-3 w-full items-center">
            <label style={{ width: "150px" }}>Total Price</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:border-blue-500"
              value={totalPrice}
              onChange={handleTotalPrice}
            />
          </div>

          <div className="flex gap-5 items-center justify-start w-full ml-80">
            <button
              onClick={finalprice}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Final Price
            </button>

            <button
              onClick={handleEditClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
          </div>

          {requestStatus === "success" && (
            <p className="text-green-500">Details Edited Successfully</p>
          )}

          {requestStatus === "error" && (
            <p className="text-red-500">
              Error making request. Please try again.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
