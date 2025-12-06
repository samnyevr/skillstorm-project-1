import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Record = (props) => {
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
        {props.record.name}
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
};

export default function RecordList() {
  const [roommateRecords, setRoommateRecords] = useState([]);
  const [inventoryRecords, setInventoryRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords(url) {
      const response = await fetch(url);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();

      let newRecords = records.map((record) => {
        return { ...record, isClicked: false };
      });

      if (url.includes("roommate")) setRoommateRecords(newRecords);
      else if (url.includes("inventory")) setInventoryRecords(newRecords);
    }
    getRecords(`http://localhost:5050/roommaterecord/`);
    return;
  }, [roommateRecords.length, inventoryRecords.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList(records) {
    return records.map((record, setRecords) => {
      return (
        <Record
          records={records}
          setRecords={setRecords}
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
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
              {recordList(roommateRecords, setRoommateRecords)}
            </section>
          </div>
          <div className="border rounded-lg overflow-hidden p-4">
            <h3 className="text-lg font-semibold p-4">Inventory Records</h3>
            <section className="flex gap-20 flex-wrap">
              {recordList(inventoryRecords, setInventoryRecords)}
            </section>
          </div>
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
