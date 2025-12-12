import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Inventory card component for displaying and interacting with a single inventory record.
 * @param {Object} props
 * @param {Object} props.record - The inventory record object.
 * @param {Array} props.records - All inventory records.
 * @param {Function} props.setRecords - Setter for updating inventory records.
 * @param {Array} props.roommateRecords - List of all roommate records.
 * @param {Function} props.deleteRecord - Callback to delete a record.
 * @param {Object|null} props.currentFocusedRoommate - Currently focused roommate.
 * @param {Function} props.setCurrentFocusedRoommate - Setter for focused roommate.
 * @param {Object|null} props.currentFocusedInventory - Currently focused inventory.
 * @param {Function} props.setCurrentFocusedInventory - Setter for focused inventory.
 */
export default function Inventory(props) {
  const [transfer, setTransfer] = useState(false);

  /**
   * Handles transferring an inventory item to another roommate.
   * @param {Event} event - Click event from the transfer button.
   */
  async function handleTansfer(event) {
    const response = await fetch(
      `http://localhost:5050/api/inventories/${props.record._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ belongsTo: event.target.id }),
      }
    );
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.log(message);
      return;
    }
    const newRecord = await response.json();

    let newRecords = props.records.filter((record) => {
      return record._id !== props.record._id;
    });

    props.setRecords(newRecords);
  }

  /**
   * Handles confirming the deletion of an inventory record.
   * @param {Event} event - Click event from the delete confirmation button.
   */
  function handleWarning(event) {
    event.stopPropagation();
    props.deleteRecord(props.record._id);
    props.setCurrentFocusedRoommate(null);
    props.setCurrentFocusedInventory(null);
  }

  return (
    <article
      className={`flex justify-center  flex-col border rounded-lg overflow-hidden p-4 md:min-w-[240px] md:min-h-[240px] cursor-pointer hover:bg-neutral-100 ${
        props.record.isClicked ? "w-full items-start" : "items-center"
      }`}
      /**
       * Toggles the expanded view of the inventory record on card click.
       */
      onClick={() => {
        let newRecords = props.records.map((record) => {
          let newRecord;

          if (record._id === props.record._id) {
            if (record.isClicked) {
              props.setCurrentFocusedInventory(null);
              newRecord = { ...record, isClicked: false };
            } else {
              props.setCurrentFocusedInventory(record);
              newRecord = { ...record, isClicked: true };
            }
          } else {
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
        {props.record.itemName}
      </h2>
      {props.record?.isClicked && (
        <>
          <section className="w-full">
            <h4 className="text-lg font-semibold p-4 w-full border-b-[1px] border-zinc-300">
              Description:{" "}
            </h4>
            <p className="p-4">{props.record.itemDescription}</p>
            <h4 className="text-lg font-semibold p-4 w-full border-b-[1px] border-zinc-300">
              Quantity:{" "}
            </h4>
            <p className="p-4">{props.record.itemCount}</p>
          </section>
          <footer>
            <div className="mt-auto flex gap-5">
              <Link
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-green-100 hover:bg-green-300 h-9 rounded-md px-3 ml-3"
                to={`/editinventory/${props.currentFocusedRoommate?._id}/${props.record._id}`}
              >
                Edit
              </Link>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-red-100 hover:bg-red-300 hover:text-accent-foreground h-9 rounded-md px-3"
                type="button"
                onClick={(event) => {
                  console.log(event);
                  event.stopPropagation();
                  document
                    .getElementById(`modal-${props.record._id}`)
                    .showModal();
                }}
              >
                Delete
              </button>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-amber-300 hover:bg-amber-600 hover:text-accent-foreground h-9 rounded-md px-3"
                type="button"
                onClick={(event) => {
                  setTransfer(!transfer);
                  event.stopPropagation();
                }}
              >
                Transfer
              </button>
            </div>
            {transfer && (
              <>
                <h3 className="mt-10 font-bold text-lg mx-3">Transfer To</h3>
                <ul className="mt-10 flex flex-wrap ml-3 gap-5">
                  {props.roommateRecords.map((record) => {
                    if (record._id === props.record.belongsTo._id) return;
                    return (
                      <li
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-blue-100 hover:bg-blue-300 hover:text-accent-foreground h-9 rounded-md px-3"
                        key={`${record._id}`}
                      >
                        <button
                          onClick={(event) => handleTansfer(event)}
                          id={`${record._id}`}
                        >{`${record.name}`}</button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
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
    </article>
  );
}
