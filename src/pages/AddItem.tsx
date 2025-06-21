import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { itemsState } from "../Atoms/atom";
import type { JSX } from "react";
import { backend_url } from "../../config.ts";
import { Button } from "../components/Button.tsx";
import { InputField } from "../components/InputField";

export const AddItem = (): JSX.Element => {
  const [items, setItems] = useRecoilState(itemsState);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newItem = {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      cover: formData.get("cover") as File,
      images: formData.getAll("images") as File[],
    };

    try {
      const uploadForm = new FormData();
      uploadForm.append("name", newItem.name);
      uploadForm.append("type", newItem.type);
      uploadForm.append("description", newItem.description);
      uploadForm.append("cover", newItem.cover);
      newItem.images.forEach((img) => uploadForm.append("images", img));

      const response = await axios.post(backend_url + "/items", uploadForm);
      const savedItem = response.data;

      setItems((prev) => [
        ...prev,
        {
          ...savedItem,
          cover: URL.createObjectURL(newItem.cover),
          images: newItem.images.map((file) => URL.createObjectURL(file)),
        },
      ]);

      toast.success("Item successfully added");
      form.reset();
      setTimeout(() => navigate("/view"), 1500);
    } catch (error) {
      console.error("Error uploading item:", error);
      toast.error("Failed to add item");
      console.log(items);
    }
  };

  return (
    <div className="flex mt-8 mx-3 items-center justify-center">
      <form onSubmit={handleSubmit} className=" space-y-4">
        <InputField
          label={"Item Name"}
          type={"text"}
          required={true}
          placeholder="Item Name"
          name="name"
        />

        <InputField
          name="type"
          placeholder="Item Type"
          label="Item Type"
          required={true}
          type="text"
        />
        <InputField
          name="description"
          placeholder="Item Description"
          cols={50}
          rows={6}
          required={true}
          type="textarea"
          label={"Item Description"}
        />
        <InputField
          type="file"
          name="cover"
          accept="image/*"
          required={true}
          label={"Cover Image"}
        />
        <InputField
          type="file"
          name="images"
          accept="image/*"
          multiple
          label="Images"
        />
        <Button text={"Add Item"} variant={"primary"} />
      </form>
    </div>
  );
};
