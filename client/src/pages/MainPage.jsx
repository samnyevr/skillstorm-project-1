import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Roommate from "../components/Roommate";
import Inventory from "../components/Inventory";

export default function MainPage() {
  const [roommateRecords, setRoommateRecords] = useState([]);
  const [inventoryRecords, setInventoryRecords] = useState([]);
  const [currentFocusedRoommate, setCurrentFocusedRoommate] = useState(null);
  const [currentFocusedInventory, setCurrentFocusedInventory] = useState(null);
  const [quantity, setQuantity] = useState(0);

  // This method fetches the full roommates/inventories from the database.
  useEffect(() => {
    async function getRoommateRecords(url) {
      const response = await fetch(url);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.log(message);
        return;
      }
      const records = await response.json();

      let newRecords = records.roommates.map((record) => {
        return { ...record, isClicked: false };
      });

      setRoommateRecords(newRecords);
    }
    getRoommateRecords(`http://localhost:5050/api/roommates/`);
    return;
  }, [roommateRecords.length]);

  useEffect(() => {
    async function getInventoryRecords(url) {
      if (!currentFocusedRoommate) return;
      const response = await fetch(url);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.log(message);
        return;
      }
      const records = await response.json();

      let newRecords = await records.inventory.map((record) => {
        setQuantity((oldQuantity) => {
          return oldQuantity + record.itemCount;
        });
        return { ...record, isClicked: false };
      });

      setInventoryRecords(newRecords);
    }
    getInventoryRecords(
      `http://localhost:5050/api/inventories/roommate/${currentFocusedRoommate?._id}`
    );
    return;
  }, [currentFocusedRoommate]);

  // useEffect(() => {
  //   inventoryRecords.map((inventory) => {
  //     setQuantity(quantity + inventory.itemCount);
  //     console.log(inventory.itemCount);
  //   });
  //   console.log(quantity);
  // }, [inventoryRecords.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/api/roommates/${id}`, {
      method: "DELETE",
    });
    const newRecords = roommateRecords.filter((el) => el._id !== id);
    setRoommateRecords(newRecords);
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
      {Array.isArray(roommateRecords) && roommateRecords.length === 0 ? (
        <section className="flex h-96 gap-10">
          <a
            className="flex-1 inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 rounded-md px-3"
            href="/createroomate"
            data-discover="true"
          >
            Click Here to add your roommate
          </a>
        </section>
      ) : (
        <section
          className={`${
            currentFocusedRoommate ? "flex flex-wrap gap-5 justify-between" : ""
          }`}
        >
          <div
            className={`border rounded-lg overflow-hidden p-4 ${
              currentFocusedRoommate ? "grow w-9/20" : "mb-10"
            }`}
          >
            <h3 className="text-lg font-semibold p-4">Roommate Records</h3>
            <section className="flex gap-20 flex-wrap">
              {roommateRecords.map((record) => {
                if (!currentFocusedRoommate) {
                  return (
                    <Roommate
                      records={roommateRecords}
                      setRecords={setRoommateRecords}
                      record={record}
                      deleteRecord={() => deleteRecord(record._id)}
                      key={record._id}
                      setCurrentFocusedRoommate={setCurrentFocusedRoommate}
                      setCurrentFocusedInventory={setCurrentFocusedInventory}
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                  );
                }
                return (
                  currentFocusedRoommate._id === record._id && (
                    <Roommate
                      records={roommateRecords}
                      setRecords={setRoommateRecords}
                      record={record}
                      deleteRecord={() => deleteRecord(record._id)}
                      key={record._id}
                      setCurrentFocusedRoommate={setCurrentFocusedRoommate}
                      setCurrentFocusedInventory={setCurrentFocusedInventory}
                      inventories={inventoryRecords}
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                  )
                );
              })}
            </section>
          </div>

          {roommateRecords.map((record) => {
            if (record.isClicked) {
              return (
                <div
                  className={`border rounded-lg overflow-hidden p-4 grow w-9/20`}
                >
                  <h3 className="text-lg font-semibold p-4">
                    Inventory Records
                  </h3>
                  <section className="flex gap-20 flex-wrap">
                    {inventoryRecords.map((record) => {
                      if (!currentFocusedInventory)
                        return (
                          <Inventory
                            records={inventoryRecords}
                            setRecords={setInventoryRecords}
                            record={record}
                            deleteRecord={() => deleteRecord(record._id)}
                            key={record._id}
                            setCurrentFocusedInventory={
                              setCurrentFocusedInventory
                            }
                          />
                        );
                      return (
                        currentFocusedInventory._id === record._id && (
                          <Inventory
                            records={inventoryRecords}
                            setRecords={setInventoryRecords}
                            record={record}
                            deleteRecord={() => deleteRecord(record._id)}
                            key={record._id}
                            setCurrentFocusedInventory={
                              setCurrentFocusedInventory
                            }
                          />
                        )
                      );
                    })}
                  </section>
                </div>
              );
            }
            return;
          })}
          <div className="flex gap-x-2">
            <NavLink
              className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
              to="/createroomate"
            >
              Add Additional Roommate
            </NavLink>
            <NavLink
              className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
              to="/createinventory"
            >
              Add Inventory
            </NavLink>
          </div>
        </section>
      )}
    </>
  );
}
