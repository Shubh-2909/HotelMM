import { useState } from "react";
import axios from "axios";

const Deletedd = () => {
  const [useremail, setUseremail] = useState("");
  const [requestStatus, setRequestStatus] = useState(null);

  const handleUseremail = (event) => {
    setUseremail(event.target.value);
  };

  const deleted = () => {
    axios
      .patch(
        `https://alcor.onrender.com/api/deleteBooking?userEmail=${useremail}`
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 flex gap-5">Delete</h1>
      <input
        type="email"
        required
        className="border border-gray-300 p-2 rounded-md mb-4 w-80"
        placeholder="Email"
        value={useremail}
        onChange={handleUseremail}
      />
      <button
        onClick={deleted}
        className="bg-blue-500 text-white px-4 py-2 mx-4 rounded-md hover:bg-blue-600"
      >
        Delete
      </button>
      {requestStatus === "success" && (
        <p className="text-green-600 mt-2">Details Removed Successfully</p>
      )}

      {requestStatus === "error" && (
        <p className="text-red-600 mt-2">
          Error making request. Please try again.
        </p>
      )}
    </div>
  );
};

export default Deletedd;
