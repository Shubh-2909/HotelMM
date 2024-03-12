import React, { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
  const [userData, setUserData] = useState([]);
  const [query, setQuery] = useState("");
  const [queryValue, setQueryValue] = useState("");
  const [requestStatus, setRequestStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://alcor.onrender.com/api/bookings${
            query ? `?${query}=${queryValue}` : ""
          }`
        );

        setUserData(response.data.data);
        setRequestStatus("success");
      } catch (error) {
        console.error("Error making GET request", error);
        setRequestStatus("error");
      }
    };

    fetchData();
  }, [query, queryValue]);

  const handleButtonClick = (clickedQuery) => {
    setQuery(clickedQuery);
    setQueryValue("");
  };

  const handleQueryValueChange = (event) => {
    setQueryValue(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="flex flex-wrap mb-8 justify-center gap-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleButtonClick("roomNumber")}
        >
          Room Number
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleButtonClick("roomType")}
        >
          Room Type
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleButtonClick("startTime")}
        >
          Start Time
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleButtonClick("endTime")}
        >
          End Time
        </button>
      </div>

      <div className="flex flex-col justify-center">
        <div className="mb-4 mx-auto">
          <input
            type="text"
            value={queryValue}
            onChange={handleQueryValueChange}
            placeholder="Enter query value"
            className="border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
        {requestStatus === "error" && (
          <p className="text-red-500">
            Error making request. Please try again.
          </p>
        )}
        {userData && userData.length > 0 && (
          <div className="overflow-x-auto mx-auto">
            <table className="table-auto border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">
                    Room Number
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Room Type
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Start Time
                  </th>
                  <th className="px-4 py-2 border border-gray-300">End Time</th>
                  <th className="px-4 py-2 border border-gray-300">Email</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.roomNumber}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.roomType}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.startTime}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.endTime}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.userEmail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
