import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { apiUrl , filterData } from "./data";
import { toast } from "react-toastify";
import { useState,useEffect } from "react";
import Spinner from "./components/Spinner";

function App() {
  
  const [courses,setCourses] = useState(null);
  const [loading,setLoading] = useState(true);
  const[category,setCategory] = useState(filterData[0].title);
  async function fetchData()
    {
      setLoading(true);
      try {
        let res = await fetch (apiUrl);
        let output = await res.json();
        //save data into variable
        setCourses(output.data);
      }
      catch(error)
      {
        toast.error("Something went Wrong");
      }
      setLoading(false);
    }

  useEffect( () => {             //to call the api
    fetchData();
  },[])
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <div>
      <Navbar />
      </div>
      <div>
      <div>
      <Filter filterData={filterData} category={category} setCategory={setCategory}/>
      </div>
      <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center align-center min-h-[50vh]">
        {
          loading ? (<Spinner></Spinner>) : (<Cards courses={courses} category={category} setCategory={setCategory}></Cards>)
        }
      </div>
      </div>
    </div>
  );
}

export default App;
