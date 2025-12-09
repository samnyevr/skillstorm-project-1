import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Roommate from "../components/Roommate";
import Inventory from "../components/Inventory";

export default function MainPage() {
  const [roommateRecords, setRoommateRecords] = useState([]);
  const [inventoryRecords, setInventoryRecords] = useState([]);
  const [currentFocusedRoommate, setCurrentFocusedRoommate] = useState(null);

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

      let newRecords = records.inventory.map((record) => {
        return { ...record, isClicked: false };
      });

      setInventoryRecords(newRecords);
    }
    getInventoryRecords(
      `http://localhost:5050/api/inventories/roommate/${currentFocusedRoommate}`
    );
    return;
  }, [currentFocusedRoommate]);

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
        <>
          <div className="border rounded-lg overflow-hidden p-4">
            <h3 className="text-lg font-semibold p-4">Roommate Records</h3>
            <section className="flex gap-20 flex-wrap">
              {roommateRecords.map((record) => {
                return (
                  <Roommate
                    records={roommateRecords}
                    setRecords={setRoommateRecords}
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                    setCurrentFocusedRoommate={setCurrentFocusedRoommate}
                  />
                );
              })}
            </section>
          </div>
          {roommateRecords.map((record) => {
            if (record.isClicked) {
              console.log("is clicked");
              return (
                <div className="border rounded-lg overflow-hidden p-4">
                  <h3 className="text-lg font-semibold p-4">
                    Inventory Records
                  </h3>
                  <section className="flex gap-20 flex-wrap">
                    {inventoryRecords.map((record) => {
                      console.log(record);
                      return (
                        <Inventory
                          records={inventoryRecords}
                          setRecords={setInventoryRecords}
                          record={record}
                          deleteRecord={() => deleteRecord(record._id)}
                          key={record._id}
                        />
                      );
                    })}
                  </section>
                </div>
              );
            }
            return;
          })}
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
        </>
      )}
    </>
  );
}
