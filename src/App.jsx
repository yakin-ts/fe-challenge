import  {useState, useEffect} from  'react'
import { arrangeSectors } from './utils/arrangeSectors'
import { baseUrl} from './api'
import SectorSelect from './components/SectorOptions'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  const [sectors, setSectors] = useState([])
  const [selectedSectors, setSelectedSectors] = useState([])
  const [name, setName] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  useEffect(() => {
    const fetchSectors = async () => {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const processedSectors = arrangeSectors(data) 
      setSectors(processedSectors);
    };
    fetchSectors();
  }, []);

  const handleSelection = (value) => {
    if (selectedSectors.includes(value)) {
      const newSelection = selectedSectors.filter((sector) => sector !== value)
      setSelectedSectors(newSelection)
    } else {
      setSelectedSectors([...selectedSectors, value])
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name || selectedSectors.length === 0 || !agreeTerms) {
      toast.error('All fields are mandatory');
      return;
    } else {
      const data = {
        name,
        sectors: selectedSectors,
        agreed: true
      }
      const response = await fetch(`${baseUrl}/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success('Data Saved Successfully');
    }

  }

  

  return (
    <div className='h-full w-full flex justify-center items-center bg-zinc-400/50'>
      <ToastContainer/>
    <div className='w-2/3 h-content flex flex-col bg-zinc-50/40 p-10 rounded-xl shadow-lg'>
      <h1 className={`text-wrap text-lg md:text-2xl font-bold text-zinc-700 mb-4`}>Please Enter Your Name and Pick the Sectors  </h1>
      <form className='flex flex-col text-left gap-3' onSubmit={handleSubmit}>
        <div className='flex flex-col md:flex-row gap-3'>
          <label htmlFor="name" className='text-md md:text-xl text-zinc-700 font-semibold'>Name :</label>
          <input 
          className=' font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 ease-in-out  rounded-lg h-8 text-center text-purple-700' 
          type="text" 
          id="name" 
          name="name" 
          placeholder='Enter your name'
          value={name} 
          onChange={(e) =>setName(e.target.value)} />
        </div>
        
        <label htmlFor="sectors" className='text-md md:text-xl text-zinc-700 font-semibold'>Sectors :</label>
         {
          sectors ?
          (<SectorSelect sectors={sectors} onChange={(e) => handleSelection(e)} selectedSectors={selectedSectors}/>) : (<div>Error Fetching Sectors</div>)
         }
         <div className='flex flex-col md:flex-row  400 md:gap-10 mt-3 gap-3'>
        <label htmlFor="terms" className='text-md md:text-xl sm:text-md font-semibold text-zinc-700'>I agree to the terms and conditions</label>
        <input 
        type="checkbox" 
        id="terms" 
        name="terms"
        value={agreeTerms}
        onChange={(e) => setAgreeTerms(e.target.checked)}
        className='h-6 w-6'
        />
         </div>
        <button 
        type="submit"
        className='bg-purple-600 h-8 w-24 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 ease-in-out mx-auto mt-3'
         >Save</button>
      </form>
    </div>
    </div>
  )
}

export default App
