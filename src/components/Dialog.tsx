import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button } from "./Button.tsx";
import { Carousel } from "react-responsive-carousel";
import { backend_url } from "../../config.ts";
import type { Key } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DialogBox = ({ selectedItem, setSelectedItem }: any) => {
  return (
    <Dialog
      open={!!selectedItem}
      onClose={() => setSelectedItem(null)}
      className="relative z-50"
    >
      <div className="fixed inset-0  bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center  h-full overflow-y-visible justify-center p-4">
        {selectedItem && (
          <DialogPanel className="bg-white p-6 rounded max-w-md w-full overflow-y-scroll">
            <DialogTitle className="text-lg font-bold">
              {selectedItem.name}
            </DialogTitle>
            <p className="text-sm text-gray-600">Type: {selectedItem.type}</p>
            <p className="my-2">{selectedItem.description}</p>
            <Carousel showThumbs={false} showStatus={false} className="mb-4">
              <div>
                <img src={backend_url + selectedItem.cover} />
              </div>
              {selectedItem.images.map(
                (img: string, i: Key | null | undefined) => (
                  <div key={i}>
                    <img src={backend_url + img} />
                  </div>
                )
              )}
            </Carousel>
            <Button text={"Enquire"} variant={"primary"} />
          </DialogPanel>
        )}
      </div>
    </Dialog>
  );
};
