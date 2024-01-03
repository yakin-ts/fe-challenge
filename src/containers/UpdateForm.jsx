import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { arrangeSectors } from "../utils/arrangeSectors";
import { baseUrl } from "../api";
import SectorSelect from "../components/SectorOptions";
import Loader from "../components/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateForm() {
  const [sectors, setSectors] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [name, setName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams()

  useEffect(() => {
    const fetchSectorsAndSectorIds = async () => {
      setLoading(true);
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const processedSectors = arrangeSectors(data);
      setSectors(processedSectors);
      const updateResponse =  await fetch(`${baseUrl}/usersectors/${id}`)
      const res = await updateResponse.json()
      setName(res.name)
      setSelectedSectors(res.sectorIds)
      setLoading(false);

    };

    fetchSectorsAndSectorIds();
  }, []);

  const handleSelection = (value) => {
    if (selectedSectors.includes(value)) {
      const newSelection = selectedSectors.filter((sector) => sector !== value);
      setSelectedSectors(newSelection);
    } else {
      setSelectedSectors([...selectedSectors, value]);
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (!name || selectedSectors.length === 0 || !agreeTerms) {
      toast.error("All fields are mandatory");
      return;
    } else {
      const data = {
        name,
        sectors: selectedSectors,
        agreed: true,
      };
      setLoading(true);
      const response = fetch(`${baseUrl}/usersectors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);      
          setLoading(false);
          localStorage.setItem("react-test-userId", data.id);
          localStorage.setItem("react-test-userName", name);
          localStorage.setItem("react-test-userSectors", JSON.stringify(selectedSectors));
          localStorage.setItem("react-test-userAgreed", true);
          navigate(`/success/${data.id}`);
        })
        .catch((error) => {
          throw new Error(`HTTP error! status: ${response.status}`);
        });
    }
  };
console.log(selectedSectors)

  return (
    <div className="h-full w-full flex justify-center items-center bg-sky-700/90 text-gray-950">
      <ToastContainer />
      <div className="flex flex-col justify-start w-4/5  h-4/5 md:h-3/5  lg:w-2/3 mx-auto border border-zinc-500 rounded-xl bg-stone-300/20 shadow-lg text-white">
        <div className="text-md md:text-lg lg:text-xl  bg-stone-300/30 w-full h-20 items-center rounded-tr-xl rounded-tl-xl flex justify-around  text-zinc-800 mb-10">
          <h1>Update your Submission </h1>
        </div>
        {
          loading  ? <Loader /> : (
            <form
          className="flex flex-col text-left gap-3 px-2 md:px-4 lg:px-10  text-sm md:text-md lg:text-lg"
          onSubmit={handleUpdate}
        >
          <div className="flex  gap-3">
            <label htmlFor="name" className="font-semibold pr-5">
              Name :
            </label>
            <input
              className="focus:outline-none w-1/2 bg-transparent border-b border-green-400 text-zinc-200 font-semibold"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row">
            <label htmlFor="sectors" className="font-semibold pr-5">
              Sectors :
            </label>
            {sectors ? (
              <SectorSelect
                sectors={sectors}
                onChange={(e) => handleSelection(e)}
                selectedSectors={selectedSectors}
              />
            ) : (
              <div>Error Fetching Sectors</div>
            )}
          </div>
          <div className="flex gap-3 md:gap-10 mb-10">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              value={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="terms" className=" font-semibold ">
              I agree to the terms and conditions
            </label>
          </div>
          <button
            type="submit"
            className="bg-green-400 h-8 w-24 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 ease-in-out mx-auto mt-3"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
          )
        }
        
      </div>
    </div>
  );
}

export default UpdateForm;
