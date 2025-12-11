import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function AddInventoryPage() {
  const [form, setForm] = useState({
    itemName: "",
    itemCount: 1,
    itemDescription: "",
    belongsTo: null,
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const inventoryId = params.inventoryId?.toString() || undefined;
      if (!inventoryId) {
        return;
      }
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/api/inventories/${inventoryId}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`RoommateRecord with id ${inventoryId} not found`);
        navigate("/");
        return;
      }
      setForm(record.inventory);
    }
    fetchData();
    if (params.roommateId) {
      updateForm({ belongsTo: params.roommateId.toString() });
    }
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /api/inventories.
        response = await fetch("http://localhost:5050/api/inventories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        // if we are updating a record we will PUT to /api/inventories/:inventoryId.
        response = await fetch(
          `http://localhost:5050/api/inventories/${params.inventoryId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
          }
        );
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
    } finally {
      setForm({
        itemName: "",
        itemCount: 1,
        itemDescription: "",
        belongsTo: null,
      });
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <Link
        className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
        to="/"
      >
        ⟵ Back to Home
      </Link>
      <h3 className="text-lg font-semibold p-4">
        Create/Update Inventory Record
      </h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Inventory Info
            </h2>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="itemName"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="itemName"
                    id="itemName"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Chips"
                    value={form.itemName}
                    onChange={(e) => updateForm({ itemName: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="itemCount"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Item Count
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="itemCount"
                    id="itemCount"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="1"
                    value={form.itemCount}
                    onChange={(e) => updateForm({ itemCount: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="itemDescription"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Item Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="itemDescription"
                    id="itemDescription"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="A bag of chips"
                    value={form.itemDescription}
                    onChange={(e) =>
                      updateForm({ itemDescription: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button type="button">
            <Link
              className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mt-4"
              to="/"
            >
              Cancel
            </Link>
          </button>
          <input
            type="submit"
            value="Save Inventory Record"
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
          />
        </div>
      </form>
    </>
  );
}
