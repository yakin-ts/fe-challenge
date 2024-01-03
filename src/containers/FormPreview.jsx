import { useState, useEffect } from "react";
import { baseUrl } from "../api";
import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import SectorName from "../components/SectorName";

const FormPreview = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await fetch(`${baseUrl}/usersectors/${id}`);
      const data = await response.json();
      setUser({ ...data, agreed: true });
      setLoading(false);
      toast.success("User Form Submitted successfully");
    };
    fetchUser();
  }, []);
  return (
    <div className="w-full h-full flex flex-col  justify-center bg-sky-700/90">
      <ToastContainer />
      <div className="flex flex-col justify-center w-4/5  h-4/5 md:h-3/5  lg:w-2/3 mx-auto border border-zinc-500 rounded-xl bg-stone-300/20 shadow-lg text-white">
        <div className="text-md md:text-lg lg:text-xl md:px-10 bg-stone-300/30 w-full h-20 items-center rounded-tr-xl rounded-tl-xl flex justify-between px-5 text-zinc-800">
          <h2 className=" font-bold"> Submission details</h2>
          <Link
            to={`/update/${id}`}
            className="font-semibold bg-red-300 px-2 cursor-pointer text-white shadow-md rounded-md"
          >
            Edit
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col w-full text-sm md:text-md lg:text-lg h-full px-4 md:px-10 py-10 items-start">
            <div className="flex  mb-10 items-center">
              <h3 className="items-center pr-5">Name:</h3>
              <p className="items-center">{user.name}</p>
            </div>
            <div className="flex mb-10 ">
              <h3 className="pr-5">Sectors:</h3>
              <div className="flex flex-wrap align-center mr-1 ">
                {user.sectors &&
                  user.sectors.map((sector, index) => {
                    return (
                      <SectorName key={index} sector={sector}/>
                    );
                  })}
              </div>
            </div>
            <div className="flex">
              <h3 className="text-md pr-5">Agreed to Terms:</h3>
              <p className="text-md capitalize"> {String(user.agreed)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPreview;
