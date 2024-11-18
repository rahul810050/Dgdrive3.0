import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [address, setAddress] = useState("");

  const getData = async () => {
    let dataArray;
    const userAddress = address || account;

    try {
      // Fetch data from the contract using the provided address or the default account
      dataArray = await contract.display(userAddress);
      console.log(dataArray);
    } catch (e) {
      alert("You don't have access");
      return;
    }

    // Check if the dataArray is empty or undefined
    if (dataArray && dataArray.length > 0) {
      const strArray = dataArray.toString().split(",");

      // Map over the string array and create image elements
      const images = strArray.map((item, i) => (
        <a
          href={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
          key={i}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
            alt={`Image ${i + 1}`}
            className="image-list"
          />
        </a>
      ));

      setData(images);
    } else {
      alert("No image to display");
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  );
};

export default Display;
