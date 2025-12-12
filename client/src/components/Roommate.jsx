import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

/**
 * Roommate card component used to display a roommate and its details.
 * Handles expanding, fetching inventory capacity, and delete confirmation.
 *
 * @param {Object} props
 * @param {Object} props.record - The roommate record being displayed.
 * @param {Array} props.records - Array of all roommate records.
 * @param {Function} props.setRecords - Setter for roomate records.
 * @param {Function} props.setCurrentFocusedRoommate - Sets the currently selected roommate.
 * @param {Object|null} props.currentFocusedRoommate - Currently selected roommate.
 * @param {Function} props.setCurrentFocusedInventory - Clears the focused inventory when switching roommates.
 * @param {Function} props.deleteRecord - Deletes a roommate.
 * @param {number} props.quantity - Current total inventory count for this roommate.
 * @param {Function} props.setQuantity - Setter for inventory quantity.
 * @param {Function} props.setShowAddInventory - Controls whether the "Add Inventory" button is visible.
 */
export default function Roommate(props) {
  let quantity = 0;

  /**
   * Fetches inventory items for the focused roommate and updates remaining capacity.
   */
  useEffect(() => {
    async function getInventoryRecords(url) {
      if (!props.currentFocusedRoommate) return;
      quantity = 0;
      const response = await fetch(url);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.log(message);
        return;
      }
      const records = await response.json();

      await records.inventory.map((record) => {
        quantity += record.itemCount;
      });
      props.setShowAddInventory(props.record.totalStorage > quantity);
    }
    getInventoryRecords(
      `http://localhost:5050/api/inventories/roommate/${props.currentFocusedRoommate?._id}`
    );

    return;
  }, [props.currentFocusedRoommate]);

  useEffect(() => {
    fillCard();
  }, []);

  /**
   * Handles confirming deletion of a roommate.
   * @param {Event} event
   */
  function handleWarning(event) {
    event.stopPropagation();
    props.deleteRecord(props.record._id);
    props.setCurrentFocusedRoommate(null);
    props.setCurrentFocusedInventory(null);
  }

  async function fillCard() {
    let fillArea = document.querySelectorAll("div.fillArea");

    Array.from(fillArea).forEach((ele) => {
      let randomQuantity = quantity ? quantity : Math.random().toFixed(2);

      let fillPercentage = 1.0 * randomQuantity * 100;
      if (fillPercentage < 50) {
        const classPattern = /^bg-/; // regex to match classes starting with 'foo-'

        // Iterate through all classes and remove those that match the regex
        ele.classList.forEach((cls) => {
          if (classPattern.test(cls)) {
            console.log(cls);
            element.classList.remove(cls);
          }
        });

        ele.classList.add("bg-green-100");
        ele.style.height = `${fillPercentage}%`;
      } else if (fillPercentage < 80) {
        const classPattern = /^bg-/; // regex to match classes starting with 'foo-'

        // Iterate through all classes and remove those that match the regex
        ele.classList.forEach((cls) => {
          if (classPattern.test(cls)) {
            element.classList.remove(cls);
          }
        });

        ele.classList.add("bg-yellow-100");
        ele.style.height = `${fillPercentage}%`;
      } else {
        const classPattern = /^bg-/; // regex to match classes starting with 'foo-'

        // Iterate through all classes and remove those that match the regex
        ele.classList.forEach((cls) => {
          if (classPattern.test(cls)) {
            element.classList.remove(cls);
          }
        });

        ele.classList.add("bg-red-100");
        ele.style.height = `${fillPercentage}%`;
      }
    });
  }

  return (
    <article
      className={`cardDesign flex justify-center  flex-col border rounded-lg overflow-hidden p-4 md:min-w-[240px] md:min-h-[240px] cursor-pointer hover:bg-neutral-100 ${
        props.record.isClicked ? "w-full items-start" : "items-center"
      }`}
      onClick={() => {
        let newRecords = props.records.map((record) => {
          let newRecord;

          if (record._id === props.record._id) {
            if (record.isClicked) {
              props.setCurrentFocusedRoommate(null);
              props.setQuantity(0);
              newRecord = { ...record, isClicked: false };
            } else {
              props.setCurrentFocusedRoommate(record);
              newRecord = { ...record, isClicked: true };
            }
          } else {
            props.setQuantity(0);
            props.setCurrentFocusedInventory(null);
            newRecord = { ...record, isClicked: false };
          }

          return newRecord;
        });

        props.setRecords(newRecords);
      }}
    >
      <h2
        className={
          props.record.isClicked ? "mt-auto text-3xl font-semibold p-4" : ""
        }
      >
        {props.record.name}
      </h2>
      {props.record?.isClicked && (
        <>
          <section className="w-full">
            <h4 className="text-lg font-semibold p-4 w-full border-b-[1px] border-zinc-300">
              Location:{" "}
            </h4>
            <p className="p-4">{props.record.location}</p>
            <h4 className="text-lg font-semibold p-4 w-full border-b-[1px] border-zinc-300">
              Description:{" "}
            </h4>
            <p className="p-4">{props.record.description}</p>
            <h4 className="text-lg font-semibold p-4 w-full border-b-[1px] border-zinc-300">
              Capacity:
            </h4>
            <p className="p-4">
              {props.quantity + "/" + props.record.totalStorage}
            </p>
          </section>
          <footer className="mt-auto flex gap-2">
            <Link
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-green-100 hover:bg-green-300 h-9 rounded-md px-3 ml-3"
              to={`/editroomate/${props.record._id}`}
            >
              Edit
            </Link>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-red-100 hover:bg-red-300 hover:text-accent-foreground h-9 rounded-md px-3"
              type="button"
              /**
               * Opens the delete confirmation modal.
               */
              onClick={(event) => {
                event.stopPropagation();
                document
                  .getElementById(`modal-${props.record._id}`)
                  .showModal();
              }}
            >
              Delete
            </button>
            <dialog id={`modal-${props.record._id}`} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg text-red-500">Warning</h3>
                <p className="py-4">
                  Are you sure you want to delete this record
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Close
                    </button>
                    <button
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-red-500 hover:bg-red-700 h-9 rounded-md px-3 ml-4"
                      onClick={(event) => {
                        handleWarning(event);
                      }}
                    >
                      Confirm
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </footer>
        </>
      )}

      <div className="fillArea"></div>
    </article>
  );
}
