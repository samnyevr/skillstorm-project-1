import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

/**
 * AddInventoryPage
 *
 * Handles creation and updating of inventory records for a specific roommate.
 * Supports:
 * - Fetching roommate capacity and existing inventory details
 * - Validating inventory item count against available storage
 * - Submitting new or updated inventory records
 *
 * URL Params:
 *  - roommateId : ID of the roommate this inventory belongs to
 *  - inventoryId (optional) : ID of an inventory record being edited
 *
 * @returns {JSX.Element}
 */
export default function AddInventoryPage() {
  /**
   * Form state for the inventory record.
   */
  const [form, setForm] = useState({
    itemName: "",
    itemCount: 0,
    itemDescription: "",
    belongsTo: null,
  });

  /** Whether the form is creating a new record or editing */
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  /** Maximum number of items the roommate can still store */
  const [maxQuantity, setMaxQuantity] = useState(0);

  /** Roommate's display name (used for toast messages) */
  const [roommate, setRoommate] = useState("");

  let isSet = false;

  /**
   * Fetch roommate capacity and (if editing) preload inventory data.
   */
  useEffect(() => {
    async function fetchData() {
      // Fetch roommate capacity and current inventory total
      const quantityResponse = await fetch(
        `http://localhost:5050/api/roommates/${params.roommateId}`
      );
      if (!quantityResponse.ok) {
        const message = `An error has occurred: ${quantityResponse.statusText}`;
        console.error(message);
        return;
      }
      const quantityRecord = await quantityResponse.json();

      const calculate =
        quantityRecord.roommate.totalStorage - quantityRecord.quantity;

      setMaxQuantity(calculate);
      setRoommate(quantityRecord.roommate.name);

      // If editing, load the inventory record
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

      if (!isSet) {
        setMaxQuantity((prev) => {
          return prev + record.inventory.itemCount;
        });
        isSet = true;
      }
    }
    fetchData();
    if (params.roommateId) {
      updateForm({ belongsTo: params.roommateId.toString() });
    }
    return;
  }, [params.id, navigate]);

  useEffect(() => {
    fetchQuantity();
  }, []);

  /**
   * Update form fields.
   * Includes validation to prevent exceeding roommate storage capacity.
   *
   * @param {Object} value - Partial form update.
   */
  async function updateForm(value) {
    if (value.itemCount) {
      if (value.itemCount >= maxQuantity) {
        toast.error(`you have reached the maximum capacity for ${roommate}`, {
          position: "bottom-center",
        });
      }
    }

    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  /**
   * Submit form handler.
   * Sends POST or PUT request depending on isNew flag.
   *
   * @param {Event} e
   */
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        // POST (create)
        response = await fetch("http://localhost:5050/api/inventories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        // PUT (update)
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
      // Reset form and return home
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
                    required
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
                    min="1"
                    max={`${maxQuantity}`}
                    value={form.itemCount ? form.itemCount : 1}
                    onChange={(e) => updateForm({ itemCount: e.target.value })}
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
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-green-500 hover:bg-green-400 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
          />
        </div>
      </form>
      <Toaster />
    </>
  );
}
