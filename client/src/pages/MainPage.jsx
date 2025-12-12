import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Roommate from "../components/Roommate";
import Inventory from "../components/Inventory";

/**
 * Main landing page for the Roommate Pantry application.
 *
 * Displays all roommates, and when one is selected, displays their
 * associated inventory records. Also handles search, deletion,
 * and fetch operations for both roommates and inventory.
 *
 * @component
 */
export default function MainPage() {
  /**
   * @state {Array<Object>} roommateRecords
   * Holds the list of all roommate documents fetched from the backend.
   */
  const [roommateRecords, setRoommateRecords] = useState([]);
  /**
   * @state {Array<Object>} inventoryRecords
   * Holds all inventory items that belong to the currently focused roommate.
   */
  const [inventoryRecords, setInventoryRecords] = useState([]);
  /**
   * @state {Object|null} currentFocusedRoommate
   * Represents the roommate currently selected by the user.
   */
  const [currentFocusedRoommate, setCurrentFocusedRoommate] = useState(null);
  /**
   * @state {Object|null} currentFocusedInventory
   * Represents the inventory item currently selected by the user.
   */
  const [currentFocusedInventory, setCurrentFocusedInventory] = useState(null);
  /**
   * @state {number} quantity
   * Total number of items (itemCount sum) stored by the selected roommate.
   */
  const [quantity, setQuantity] = useState(0);
  /**
   * @state {boolean} showAddInventory
   * Determines whether the "Add Inventory" button should be visible
   * based on storage capacity limits.
   */
  const [showAddInventory, setShowAddInventory] = useState(true);

  /**
   * Fetches all roommate records on initial load or when the number
   * of records changes. Adds UI state (`isClicked`) to each.
   *
   * @effect
   */
  useEffect(() => {
    /**
     * Fetches roommate documents.
     * @async
     * @param {string} url - API endpoint for roommate list.
     */
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

  /**
   * Loads inventory records when a roommate is selected.
   *
   * @effect
   */
  useEffect(() => {
    /**
     * Fetches inventory records for the focused roommate.
     *
     * @async
     * @param {string} url - API endpoint for fetching inventory.
     */
    async function getInventoryRecords(url) {
      if (!currentFocusedRoommate) return;
      setQuantity(0);
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

  /**
   * Deletes a roommate record from the backend and removes it from local state.
   *
   * @async
   * @function deleteRoommateRecord
   * @param {string} id - Roommate document ID.
   */
  async function deleteRoommateRecord(id) {
    console.log(id);
    await fetch(`http://localhost:5050/api/roommates/${id}`, {
      method: "DELETE",
    });
    const newRecords = roommateRecords.filter((el) => el._id !== id);
    setRoommateRecords(newRecords);
  }

  /**
   * Deletes a single inventory record.
   *
   * @async
   * @function deleteInventoryRecord
   * @param {string} id - Inventory document ID.
   */
  async function deleteInventoryRecord(id) {
    await fetch(`http://localhost:5050/api/inventories/${id}`, {
      method: "DELETE",
    });
    const newRecords = inventoryRecords.filter((el) => el._id !== id);
    setInventoryRecords(newRecords);
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
            className={`border rounded-lg overflow-hidden p-4 w-full ${
              currentFocusedRoommate ? "grow w-9/20" : "mb-10"
            }`}
          >
            <h3 className="text-lg font-semibold p-4">Roommate Records</h3>
            <section className="flex md:gap-20 flex-wrap">
              {roommateRecords.map((record) => {
                if (!currentFocusedRoommate) {
                  return (
                    <Roommate
                      records={roommateRecords}
                      setRecords={setRoommateRecords}
                      record={record}
                      deleteRecord={() => deleteRoommateRecord(record._id)}
                      key={record._id}
                      currentFocusedRoommate={currentFocusedRoommate}
                      setCurrentFocusedRoommate={setCurrentFocusedRoommate}
                      setCurrentFocusedInventory={setCurrentFocusedInventory}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      setShowAddInventory={setShowAddInventory}
                    />
                  );
                }
                return (
                  currentFocusedRoommate._id === record._id && (
                    <Roommate
                      records={roommateRecords}
                      setRecords={setRoommateRecords}
                      record={record}
                      deleteRecord={() => deleteRoommateRecord(record._id)}
                      key={record._id}
                      currentFocusedRoommate={currentFocusedRoommate}
                      setCurrentFocusedRoommate={setCurrentFocusedRoommate}
                      setCurrentFocusedInventory={setCurrentFocusedInventory}
                      inventories={inventoryRecords}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      setShowAddInventory={setShowAddInventory}
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
                  <div className="flex flex-wrap items-center">
                    <h3 className="text-lg font-semibold p-4">
                      Inventory Records
                    </h3>
                    <label className="input bg-gray-200 m-4">
                      <svg
                        className="h-[1em] opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <g
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                          fill="none"
                          stroke="currentColor"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </g>
                      </svg>
                      <input
                        type="search"
                        className="grow"
                        placeholder="Search"
                        name="search"
                        onKeyDown={async (e) => {
                          if (e.code === "Enter" && e.target.value.length > 0) {
                            let url = `http://localhost:5050/api/inventories/find/${e.target.value}`;
                            const response = await fetch(url);
                            if (!response.ok) {
                              const message = `An error occurred: ${response.statusText}`;
                              console.log(message);
                              return;
                            }
                            const records = await response.json();

                            const newRecords = records.inventory.filter(
                              (record) => {
                                return (
                                  record.belongsTo ===
                                  currentFocusedRoommate._id
                                );
                              }
                            );

                            setInventoryRecords(newRecords);
                          }
                          if (
                            e.target.value.length == 0 &&
                            e.code == "Backspace"
                          ) {
                            let newCurrent = { ...currentFocusedRoommate };
                            setCurrentFocusedRoommate(newCurrent);
                          }
                          return;
                        }}
                      />
                      <kbd hidden className="kbd kbd-sm">
                        ⌘
                      </kbd>
                      <kbd hidden className="kbd kbd-sm">
                        K
                      </kbd>
                    </label>
                    <form className="filter">
                      <input
                        className="btn btn-square"
                        type="reset"
                        value="×"
                      />
                      <input
                        className="btn"
                        type="radio"
                        name="frameworks"
                        aria-label="Svelte"
                      />
                      <input
                        className="btn"
                        type="radio"
                        name="frameworks"
                        aria-label="Vue"
                      />
                      <input
                        className="btn"
                        type="radio"
                        name="frameworks"
                        aria-label="React"
                      />
                    </form>
                  </div>
                  <section className="flex md:gap-20 flex-wrap">
                    {inventoryRecords.map((record) => {
                      if (!currentFocusedInventory)
                        return (
                          <Inventory
                            records={inventoryRecords}
                            roommateRecords={roommateRecords}
                            setRecords={setInventoryRecords}
                            record={record}
                            deleteRecord={() =>
                              deleteInventoryRecord(record._id)
                            }
                            key={record._id}
                            currentFocusedRoommate={currentFocusedRoommate}
                            setCurrentFocusedInventory={
                              setCurrentFocusedInventory
                            }
                          />
                        );
                      return (
                        currentFocusedInventory._id === record._id && (
                          <Inventory
                            records={inventoryRecords}
                            roommateRecords={roommateRecords}
                            setRecords={setInventoryRecords}
                            record={record}
                            deleteRecord={() =>
                              deleteInventoryRecord(record._id)
                            }
                            key={record._id}
                            currentFocusedRoommate={currentFocusedRoommate}
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
          <div className="flex gap-x-2 w-full flex-wrap">
            <NavLink
              className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-10 py-6 md:ml-auto mb-5 md:mb-0"
              to="/createroomate"
            >
              Add Additional Roommate
            </NavLink>
            {currentFocusedRoommate && showAddInventory ? (
              <NavLink
                className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-10 py-6 px-10"
                to={`/createinventory/${currentFocusedRoommate._id.toString()}`}
              >
                Add Inventory
              </NavLink>
            ) : (
              <></>
            )}
          </div>
        </section>
      )}
    </>
  );
}
