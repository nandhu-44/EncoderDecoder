import { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import { encrypt, decrypt } from "cipher-guard";
import { PiTreeStructureFill } from "react-icons/pi";
import { FaCode } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { IoCopy } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

function App() {
  // Whether to encode or decode.
  const [type, setType] = useState("");

  // Encoded/Decoded text.
  const [text, setText] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const [decodedText, setDecodedText] = useState("");

  // Configuration for the cipher-guard library.
  const [key, setKey] = useState(null);
  const [salt, setSalt] = useState(null);

  // Copy to clipboard states.
  const [copied, setCopied] = useState(false);

  // Modal state
  const [openModal, setOpenModal] = useState(false);

  // Form fields
  const [newKey, setNewKey] = useState(null);
  const [newSalt, setNewSalt] = useState(null);

  // Load key and salt from local storage.
  useEffect(() => {
    const config = localStorage.getItem("config");
    if (!config) {
      setKey(null);
      setSalt(null);
      return;
    }

    const { key, salt } = JSON.parse(atob(config));

    setKey(key ?? null);
    setNewKey(isNaN(key) ? null : key ?? null);
    setSalt(salt ?? null);
    setNewSalt(salt ?? null);
  }, []);

  // Copy effect
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  return (
    <div>
      <div className="bg-slate-800 text-white flex flex-col">
        {/* Header Section */}
        <header className="flex justify-between">
          <div className="flex flex-row items-center">
            <FaCode className="w-6 h-6 lg:w-10 lg:h-10 text-amber-400 my-2  mx-2 lg:mx-4 font-light" />
            <h1 className="lg:text-3xl text-2xl text-white">Encoder Decoder</h1>
          </div>
          <FiSettings
            className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400 my-2 mx-2 lg:mx-4 font-light hover:cursor-pointer"
            onClick={() => setOpenModal(true)}
          />
        </header>
        {/* Description */}
        <p className="text-white font-nunito-sans lg:text-xl md:text-lg lg:mx-20 mx-6 my-4">
          This project is a simple web utility for encrypting and decrypting
          text using the{" "}
          <a
            href="https://npmjs.com/package/cipher-guard"
            target="_blank"
            className="decoration-blue-400 underline text-violet-400 hover:text-violet-500 hover:decoration-blue-500"
          >
            cipher-guard
          </a>{" "}
          library. You can configure your{" "}
          <span className="text-violet-400">key</span> and{" "}
          <span className="text-violet-400">salt</span> by clicking on the
          settings icon.
        </p>
      </div>
      {/* Divider */}
      <div className="bg-slate-700 w-screen h-[1.25px]"></div>
      {/* Navigation Buttons */}
      <div className="flex flex-row items-center justify-center text-white font-semibold">
        <button
          className="flex flex-row bg-emerald-600 px-4 py-2 my-2 md:my-4 mx-1 rounded-lg items-center"
          onClick={() => {
            setType("encoder");
            setText("");
            setEncodedText("");
            setDecodedText("");
            setCopied(false);
          }}
        >
          <PiTreeStructureFill className="text-white h-6 w-6" />
          <span className="mx-2 text-lg">Encoder</span>
        </button>
        <button
          className="bg-red-600  px-4 py-2 md:my-4 my-2 mx-1 rounded-lg flex flex-row items-center"
          onClick={() => {
            setType("decoder");
            setText("");
            setEncodedText("");
            setDecodedText("");
            setCopied(false);
          }}
        >
          <PiTreeStructureFill className="text-white rotate-180 h-6 w-6" />
          <span className="mx-2 text-lg">Decoder</span>
        </button>
      </div>
      {/* Divider */}
      <div className="bg-slate-700 w-screen h-[1.25px]"></div>
      {/* If encoder is to be used */}
      {type === "encoder" && (
        <div className="flex flex-col items-center text-white font-semibold lg:px-20 mx-2">
          <textarea
            className="bg-slate-900 text-white w-full h-24 md:h-40 p-4 my-4 rounded-lg"
            placeholder="Enter text to encode..."
            style={{ resize: "none" }}
            value={text}
            onChange={(event) => setText(event.target.value)}
          ></textarea>
          <button
            className="bg-emerald-600 w-full p-2 m-2 rounded-lg"
            onClick={() => {
              if (!salt || isNaN(key)) {
                alert(
                  "Please configure the key and salt first by clicking the settings icon."
                );
                return;
              }
              try {
                const encoded = encrypt(text, key, salt);
                setEncodedText(encoded);
              } catch (error) {
                alert("Unable to encode text!");
                console.error(`Cipher Guard Error: ${error}`);
              }
            }}
          >
            Encode
          </button>
          {encodedText && (
            <>
              <div className="flex flex-row w-full mt-4">
                <h2 className="text-white lg:text-2xl text-lg text-left">
                  Encoded Text{" "}
                </h2>
              </div>
              <div className="bg-slate-900 flex relative p-4 pr-2 text-white w-full h-24 md:h-40 my-2 rounded-lg">
                <textarea
                  className="bg-slate-900 border-0 w-full h-full my-2 focus:outline-none text-white focus:ring-0 focus:border-transparent"
                  placeholder="Encoded text..."
                  style={{ resize: "none" }}
                  value={encodedText}
                  readOnly
                ></textarea>
                <div className="absolute right-2 top-2 hover:cursor-pointer z-50">
                  <IoCopy
                    className={`text-white size-4 hover:text-purple-500  ${
                      copied ? "hidden" : ""
                    } transition-all duration-300 ease-in-out`}
                    onClick={() => {
                      navigator.clipboard.writeText(encodedText);
                      setCopied(true);
                    }}
                  />
                  <IoCheckmarkDoneOutline
                    className={`text-green-400 size-5 ${
                      copied ? "" : "hidden"
                    } transition-all duration-300 ease-in-out animate-pulse`}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {/* If decoder is to be used */}
      {type === "decoder" && (
        <div className="flex flex-col items-center text-white font-semibold lg:px-20 mx-2">
          <textarea
            className="bg-slate-900 text-white w-full h-24 md:h-40 p-4 my-4 rounded-lg"
            placeholder="Enter text to decode..."
            style={{ resize: "none" }}
            value={text}
            onChange={(event) => setText(event.target.value)}
          ></textarea>
          <button
            className="bg-red-600 w-full p-2 m-2 rounded-lg"
            onClick={() => {
              if (!salt || isNaN(key)) {
                alert(
                  "Please configure the key and salt first by clicking the settings icon."
                );
                return;
              }
              try {
                const decoded = decrypt(text, key, salt);
                setDecodedText(decoded);
                if (!decoded) {
                  alert(
                    "Unable to decode text! Make sure it is encoded properly!"
                  );
                }
              } catch (error) {
                alert(
                  "Unable to decode text! Make sure you have the same salt and key it was encoded with."
                );
                console.error(`Cipher Guard Error: ${error}`);
              }
            }}
          >
            Decode
          </button>
          {decodedText && (
            <>
              <div className="flex flex-row w-full mt-4">
                <h2 className="text-white lg:text-2xl text-lg text-left">
                  Decoded Text{" "}
                </h2>
              </div>
              <div className="bg-slate-900 flex relative p-4 pr-2 text-white w-full h-24 md:h-40 my-2 rounded-lg">
                <textarea
                  className="bg-slate-900 border-0 w-full h-full my-2 focus:outline-none text-white focus:ring-0 focus:border-transparent"
                  placeholder="Decoded text..."
                  style={{ resize: "none" }}
                  value={decodedText}
                  readOnly
                ></textarea>
                <div className="absolute right-2 top-2 hover:cursor-pointer z-50">
                  <IoCopy
                    className={`text-white size-4 hover:text-purple-500  ${
                      copied ? "hidden" : ""
                    } transition-all duration-300 ease-in-out`}
                    onClick={() => {
                      navigator.clipboard.writeText(decodedText);
                      setCopied(true);
                    }}
                  />
                  <IoCheckmarkDoneOutline
                    className={`text-green-400 size-5 ${
                      copied ? "" : "hidden"
                    } transition-all duration-300 ease-in-out animate-pulse`}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Modal Component */}
      <Modal
        show={openModal}
        dismissible
        className="bg-black backdrop-blur-sm pt-20 md:pt-0"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="bg-slate-700">
          <span className="text-white rounded-t-md font-bold text-xl px-2 border-b-slate-800">
            Cipher Guard Config
          </span>
        </Modal.Header>
        <Modal.Body className="bg-slate-700 text-white rounded-b-md md:p-4 p-2">
          <form action="#" className="flex flex-col lg:px-2 px-0">
            <label htmlFor="key" className="mt-4">
              Key{" "}
              <span className="text-base italic text-gray-400">(0 - 127)</span>
            </label>
            <input
              type="number"
              name="key"
              id="key"
              placeholder="A number between 0 and 127 (inclusive)"
              value={newKey}
              onChange={(event) => setNewKey(event.target.value)}
              className="bg-slate-900 text-white rounded-md placeholder-gray-500"
            />
            <label htmlFor="salt" className="mt-2">
              Salt
            </label>
            <input
              type="password"
              name="salt"
              id="salt"
              placeholder="A secret string to use for ciphering"
              value={newSalt}
              onChange={(event) => setNewSalt(event.target.value)}
              className="bg-slate-900 text-white rounded-md placeholder-gray-500"
            />
          </form>
          <div className="flex flex-row lg:px-2 px-0">
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md mt-4 font-semibold"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md mt-4 ml-2 font-semibold"
              onClick={() => {
                if (isNaN(newKey) || newKey < 0 || newKey > 127) {
                  alert("Please enter a valid key between 0 and 127.");
                  return;
                }
                if (!newSalt) {
                  alert("Please enter a valid salt.");
                  return;
                }

                const config = JSON.stringify({
                  key: newKey,
                  salt: newSalt,
                });

                localStorage.setItem("config", btoa(config).replace(/=/g, ""));

                setKey(parseInt(newKey));
                setSalt(newSalt);
                setOpenModal(false);
              }}
            >
              Save
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
