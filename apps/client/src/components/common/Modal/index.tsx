import { LoaderSpinner } from "../Loader/LoaderSpinner";

interface InputProps {
  input: React.ReactNode;
}

interface ModalProps {
  title: string;
  inputs: InputProps[];
  onCancel: () => void;
  onSave: () => void;
  isLoading: boolean;
}

export function Modal({
  title,
  inputs,
  onCancel,
  onSave,
  isLoading = false,
}: ModalProps) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 shadow-lg relative flex flex-col w-full bg-gray-100 outline-none focus:outline-none">
            <div className="p-4">
              <span className="font-semibold text-xl">{title}</span>
            </div>

            <div className="p-4">
              {inputs?.map((i, index) => (
                <div className="flex flex-col items-start mb-1" key={index}>
                  {i.input}
                </div>
              ))}
            </div>

            <div className="flex">
              <button
                className="w-1/2 bg-black text-white font-semibold p-2"
                onClick={onCancel}
              >
                Cancel
              </button>
              {isLoading ? (
                <button
                  className="w-1/2 bg-blue-500 text-white font-semibold p-2 flex justify-center items-center"
                  disabled={true}
                >
                  <LoaderSpinner
                    width={20}
                    height={20}
                    strokeWidth={8}
                    strokeWidthSecondary={8}
                    primaryColor={"#ffffff"}
                    secondaryColor={"#bcbcbc"}
                  />
                </button>
              ) : (
                <button
                  className="w-1/2 bg-blue-500 text-white font-semibold p-2"
                  onClick={onSave}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
