import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Inventory(props) {
  return (
    <article
      className="flex justify-center items-center flex-col border rounded-lg overflow-hidden p-4 min-w-[240px] min-h-[240px] cursor-pointer hover:bg-neutral-100"
      onClick={() => {
        let newRecords = props.records.map((record) => {
          return record._id === props.record._id
            ? record.isClicked
              ? { ...record, isClicked: false }
              : { ...record, isClicked: true }
            : { ...record, isClicked: false };
        });

        props.setRecords(newRecords);
      }}
    >
      <h2 className={props.record.isClicked ? "mt-auto" : ""}>
        {props.record.itemName}
      </h2>
      {props.record?.isClicked ? (
        <footer className="mt-auto flex gap-2">
          <Link
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            to={`/editroomate/${props.record._id}`}
          >
            Edit
          </Link>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
            color="red"
            type="button"
            onClick={() => {
              props.deleteRecord(props.record._id);
            }}
          >
            Delete
          </button>
        </footer>
      ) : (
        <></>
      )}
    </article>
  );
}
