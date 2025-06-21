import { useRecoilState } from "recoil";
import { toast } from "react-hot-toast";
import { useEffect, useState, type JSX } from "react";
import axios from "axios";
import { itemsState, type Item } from "../Atoms/atom.tsx";
import { backend_url } from "../../config.ts";
import { DialogBox } from "../components/Dialog.tsx";
import { Button } from "../components/Button.tsx";
import { useNavigate } from "react-router-dom";

export const ViewItems = (): JSX.Element => {
  const [items, setItems] = useRecoilState(itemsState);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(backend_url + "/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
        toast.error("Failed to load items");
      }
    };
    fetchItems();
  }, [setItems]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.length == 0 ? (
          <div className="flex flex-col gap-3 h-screen w-screen items-center justify-center">
            no data found
            <Button
              text={"Add Item"}
              variant={"primary"}
              onClick={() => navigate("/add")}
            />
          </div>
        ) : (
          items.map((item, idx) => (
            <div
              key={idx}
              className=" flex flex-col items-center justify-between shadow-2xl hover:scale-110 hover:shadow-[0px_0px_95px_53px_#00000024]  transition duration-300  ease-in gap-3 p-4 mt-10 ml-5 rounded-xl cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={backend_url + item.cover}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <p className="mt-2 text-center">{item.name}</p>
            </div>
          ))
        )}
      </div>
      <DialogBox
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
};
