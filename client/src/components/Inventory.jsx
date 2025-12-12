import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Inventory(props) {
  function handleWarning(event) {
    event.stopPropagation();
    props.deleteRecord(props.record._id);
    props.setCurrentFocusedRoommate(null);
    props.setCurrentFocusedInventory(null);
  }

  return (
    <article
      className={`flex justify-center  flex-col border rounded-lg overflow-hidden p-4 min-w-[240px] min-h-[240px] cursor-pointer hover:bg-neutral-100 ${
        props.record.isClicked ? "w-full items-start" : "items-center"
      }`}
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
          <footer className="mt-auto flex gap-2">
            <Link
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
              to={`/editinventory/${props.currentFocusedRoommate?._id}/${props.record._id}`}
            >
              Edit
            </Link>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
              color="red"
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
