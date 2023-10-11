import React, { useState,useEffect, useRef  } from "react";
import logo from "../../../public/images/logo/logo.png";
import { useLocation, useHistory } from "react-router-dom";
import { Toaster,toast } from "react-hot-toast";
import "./Booking1.css";
import Select from "react-select";
const Booking1 = () => {

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    dateInputRef.current.min = today;
    dateInputRef2.current.min = today;
    getAllPublishers()
  }, []);

  const history = useHistory();
  const { datacom } = useLocation();
  const data1 = datacom.data;
  const adStatus = "Pending";
  // const history = useHistory();
  const [adOrientation, setAdOrientation] = useState(" ");
  const [adType, setAdType] = useState(" ");
  const [adCategories, setAdcategories] = useState(" ");
  const [adImage, setImages] = useState(" ");
  const [adDuration, setAdDuration] = useState(" ");
  const [startDate, setStartdate] = useState(" ");
  const [endDate, setEndDate] = useState(" ");
  const [timeSlot, setTimeSlot] = useState([]);
  const [country, setCountry] = useState(" ");
  const [state, setState] = useState(" ");
  const [city, setCity] = useState(" ");
  const [area, setAreas] = useState(" ");
  const [AdPerDay, setAd] = useState("");
  const [datevalid,setDateValid] = useState(true);
  // const [duration, setDuration] = useState("");

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setCity(""); // Reset the city when the state changes
    cityList=[]
    publishers.map((values)=>{
      if(values.state==selectedState){
      cityList.push(values.city)
      }
    })
    setListOfCities(cityList);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyName = data1.companyName;
    const companyOwnerName = data1.companyOwnerName;
    const companyEmail = data1.companyEmail;
    const companyContactNumber = data1.companyContactNumber;
    const companyAddress = data1.companyAddress;
    const slots = [];
    timeSlot.map((item) => {
      slots.push(item.label);
    });
    console.log(slots);
    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    let user = await fetch("http://localhost:3000/userData",{
      method:"post",
      body:JSON.stringify({
        token,role
      }),
      headers:{
        "Content-Type":"application/json"
      }

    });
    user = await user.json();
    let userId = ""
    if(user){
      userId = user._id;
      console.log(userId);
    }
    let result = await fetch("http://localhost:3000/booking", {
      method: "post",
      body: JSON.stringify({
        companyName,
        companyOwnerName,
        companyEmail,
        userId,
        companyContactNumber,
        companyAddress,
        adStatus,
        adOrientation,
        adType,
        adCategories,
        adImage,
        adDuration,
        startDate,
        endDate,
        slots,
        country,
        state,
        city,
        area,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      console.log(result);
      history.push({
        pathname: `/app/pages/checkout`,
        totalamount: { totalcost },
      });
      console.log("added");
    } else {
      console.log("some error occured");
    }
  };
 
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setAreas(""); // Reset the area when the city changes
    // setAreas(getAreasByCity(selectedCity));
    areaList=[]
    publishers.map((values)=>{
      if(values.city===selectedCity){
      areaList.push(values.area);
      }
    })
    setListOfAreas(areaList);
  };

  const handleAreaChange = (e) => {
    setAreas(e.target.value);
  };

  const handleclick = (e) => {
    e.preventDefault();
    console.log("redirect to landingpage");
    // history.push("/app");
  };
  const handleback = (e) => {
    e.preventDefault();
    console.log("redirect to booking");
    history.push("/app/components/Forms/Booking");
  };
  // const City1 =[ "Area1","Area2","Area3"];
    const [listOfStates,setListOfStates]= useState([])
    const [listOfCities,setListOfCities] = useState([])
    const [listOfAreas,setListOfAreas] = useState([])
    const [publishers,setPublishers] = useState([]);
    let stateList = []
    let cityList = []
    let areaList = []
    const getAllPublishers = async()=>{
      let states = await fetch("http://localhost:3000/getPublishers");
      states = await states.json();
      setPublishers(states);
      states.map((values)=>{
          stateList.push(values.state);
      })
      setListOfStates(stateList);
    }
    
  const getLocations = async()=>{

  }
  // const states = [
  //   { name: "Gujarat", cities: ["Ahmedabad", "Surat", "Gandhinagar"] },
  //   { name: "Mharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
  //   { name: "Uttar Pradesh", cities: ["Lucknow", "Pryagraj", "Kanpur"] },
  // ];

  const getCitiesByState = (selectedState) => {
    const foundState = states.find((state) => state.name === selectedState);
    return foundState ? foundState.cities : [];
  };

  const getAreasByCity = (selectedCity) => {
    // Placeholder implementation, replace with your own data retrieval logic
    // For demonstration purposes, return some example areas based on the selected city
    if (selectedCity === "Ahmedabad") {
      return ["Area 1", "Area 2", "Area 3"];
    } else if (selectedCity === "Surat") {
      return ["Area 4", "Area 5", "Area 6"];
    } else if (selectedCity === "Gandhinagar") {
      return ["Area 7", "Area 8", "Area 9"];
    } else if (selectedCity === "Mumbai") {
      return ["Area 4", "Area 5", "Area 6"];
    } else if (selectedCity === "Pune") {
      return ["Area 7", "Area 8", "Area 9"];
    } else if (selectedCity === "Nagpur") {
      return ["Area 4", "Area 5", "Area 6"];
    } else if (selectedCity === "Lucknow") {
      return ["Area 7", "Area 8", "Area 9"];
    } else if (selectedCity === "Pryagraj") {
      return ["Area 4", "Area 5", "Area 6"];
    } else if (selectedCity === "Kanpur") {
      return ["Area 7", "Area 8", "Area 9"];
    } else {
      return [];
    }
  };

  const timeSlots = [
    { value: "6:00 AM to 6:30 AM", label: "6:00 AM to 6:30 AM" },
    { value: "7:00 AM to 7:30 AM", label: "7:00 AM to 7:30 AM" },
    { value: "8:00 AM to 8:30 AM", label: "8:00 AM to 8:30 AM" },
    { value: "9:00 AM to 9:30 AM", label: "9:00 AM to 9:30 AM" },
    { value: "10:00 AM to 10:30 AM", label: "10:00 AM to 10:30 AM" },
    { value: "11:00 AM to 11:30 AM", label: "11:00 AM to 11:30 AM" },
    { value: "12:00 PM to 12:30 PM", label: "12:00 PM to 12:30 PM" },
    { value: "1:00 PM to 1:30 PM", label: "1:00 PM to 1:30 PM" },
    { value: "2:00 PM to 2:30 PM", label: "2:00 PM to 2:30 PM" },
    { value: "3:00 PM to 3:30 PM", label: "3:00 PM to 3:30 PM" },
    { value: "4:00 PM to 4:30 PM", label: "4:00 PM to 4:30 PM" },
    { value: "5:00 PM to 5:30 PM", label: "5:00 PM to 5:30 PM" },
    { value: "6:00 PM to 6:30 PM", label: "6:00 PM to 6:30 PM" },
    { value: "7:00 PM to 7:30 PM", label: "7:00 PM to 7:30 PM" },
    { value: "8:00 PM to 8:30 PM", label: "8:00 PM to 8:30 PM" },
    { value: "9:00 PM to 9:30 PM", label: "9:00 PM to 9:30 PM" },
    { value: "10:00 PM to 10:30 PM", label: "10:00 PM to 10:30 PM" },
    { value: "11:00 PM to 11:30 PM", label: "11:00 PM to 11:30 PM" },
    // Add more time slot options here
  ];

  const handleTimeSlotChange = (tm) => {
    setTimeSlot(tm);
    tm.map((item) => {
      console.log(item.label);
    });
    console.log(tm);
  };
  const parameters = {
    adDuration,
    AdPerDay: AdPerDay,
    // totalDays: endDate.split("-")[2] - startDate.split("-")[2],
    totalDays:(Date.parse(endDate)-Date.parse(startDate))/(86400000)
  };
  const calculateTotalCost = () => {
    const costPerAd = 2 * parameters.adDuration;
    const costPerDay = costPerAd * parameters.AdPerDay;
    const TotalCost = costPerDay * parameters.totalDays;

    return TotalCost;
  };
  const totalcost = calculateTotalCost();
  const isDateValid = ()=>{
    if((Date.parse(endDate)-Date.parse(startDate))<0)
    {
      // setDateValid(false);
      document.getElementById("btn").disabled = true;
      return toast.error("Dates are not valid Please Enter Valid Dates");
    }
    else if((Date.parse(endDate)-Date.parse(startDate))>0){
      document.getElementById("btn").disabled = false;
    // return true;
    }
  }
  const dateInputRef = useRef(null);
  const dateInputRef2 = useRef(null);
  


  return (
    <div className="con1">
      <Toaster></Toaster>
      <div className="content">
        <div className="container">
          <div className="headerfeild">
            <div>
              <img src={logo} style={{ width: 30 }} />
              <button className="no" onClick={handleclick}>
                <header>AdHive</header>
              </button>
            </div>
            <div>
              <button className="no" onClick={handleback}>
                <header>Back</header>
              </button>
            </div>
          </div>
          <h1 className="head">Registration</h1>
          <form action="http://localhost:3000/uploadVideo" name="bookingForm" encType='multipart/form-data' method="POST" >
            <div className="form first">
              <div className="details personal">
                <span className="title">Ad Details</span>
                <div className="fields">
                  <div className="input-field-type2">
                    <label htmlFor="orientation-type">Ad Orientation</label>
                    <select
                      id="orientation-type"
                      onChange={(e) => setAdOrientation(e.target.value)}
                    >
                      <option value="">Select Ad Orientation</option>
                      <option value="Verticle">Verticle</option>
                      <option value="Horizontal">horizontal</option>
                    </select>
                  </div>

                  <div className="input-field-type2">
                    <label htmlFor="ad-type">Ad Type:</label>
                    <select
                      id="ad-type"
                      onChange={(e) => setAdType(e.target.value)}
                    >
                      <option value="">Select Ad Type</option>
                      <option value="Photo">Photo</option>
                      <option value="Video">Video</option>
                    </select>
                  </div>

                  {adType === "Photo" && (
                    <div className="input-field">
                      <label className="upar" htmlFor="photo">
                        Add Photo:
                      </label>
                      <input
                        type="file"
                        id="photo"
                        name="photo"
                        onChange={(e)=>{console.log(e.target.files[0])}}
                        accept="image/png, image/jpeg"
                        required
                      />
                    </div>
                  )}

                  {adType === "Video" && (
                    <div className="input-field">
                      <label className="upar" htmlFor="video">
                        Add Video:
                      </label>
                      <input
                        type="file"
                        id="video"
                        name="video"
                        onChange={(e)=>{console.log(e.target.files[0])}}
                        accept="video/*,video/mkv"
                        required
                      />
                    </div>
                  )}

                  <div className="input-field-type2">
                    <label>Ad Categories</label>
                    <select
                      id="category-type"
                      onChange={(e) => setAdcategories(e.target.value)}
                    >
                      <option value="">Select Ad Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Food and Beverages">
                        Food and Beverages
                      </option>
                      {/* Add more options here */}
                    </select>
                  </div>

                  <div className="input-field-type2">
                    <label htmlFor="duration">Ad Duration:</label>
                    <input
                      type="number"
                      id="duration"
                      name="duration"
                      min="1"
                      onChange={(e) => setAdDuration(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-field-type2">
                    <label htmlFor="start-date">Start Date:</label>
                    <input
                      type="date"
                      ref={dateInputRef}
                      id="start-date"
                      name="start-date"
                      onChange={(e) => setStartdate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-field-type2">
                    <label htmlFor="end-date">End Date:</label>
                    <input
                      type="date"
                      ref={dateInputRef2}
                      id="end-date"
                      name="end-date"
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-field-type2">
                    <label htmlFor="Ad/day">No.of Ads per day</label>
                    <input
                      onChange={(e) => setAd(e.target.value)}
                      placeholder="Enter the No of ads in a day"
                      type="number"
                      id="Ad/day"
                      name="Ad/day"
                      required
                    />
                  </div>

                  <div className="input-field-type1">
                    <label htmlFor="time-slots">Time Slots:</label>
                    <Select
                      id="time-slots"
                      isMulti
                      options={timeSlots}
                      onChange={handleTimeSlotChange}
                      value={timeSlot}
                    />
                    {/* <p>Selected Time Slots: {timeSlot.length > 0 ? timeSlot.map((option) => option.label).join(', ') : 'None'}</p> */}
                  </div>
                </div>
              </div>

              <div className="details personal">
                <span className="title">Show Ad In</span>
                <div className="fields">
                  <div className="input-field-type2">
                    <label>Country:</label>
                    <select
                      id="country"
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">Select Country</option>
                      <option value="India">India</option>

                      {/* Add more countries here */}
                    </select>
                  </div>

                  <div className="input-field-type2">
                    <label htmlFor="state">State:</label>
                    <select
                      id="state"
                      value={state}
                      onChange={handleStateChange}
                    >
                      <option value="">Select</option>
                      {listOfStates.map((state) => (
                        <option value={state} key={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-field-type2">
                    <label htmlFor="city">City:</label>
                    <select
                      id="city"
                      value={city}
                      onChange={handleCityChange}
                      disabled={!state}
                    >
                      <option value="">Select</option>
                      {listOfCities.map((city) => (
                        <option value={city} key={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-field-type2">
                    <label htmlFor="area">Area:</label>
                    <select
                      id="area"
                      value={area}
                      onChange={handleAreaChange}
                      disabled={!city}
                    >
                      <option value="">Select</option>
                      {listOfAreas.map((area) => (
                        <option value={area} key={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                  {adDuration && startDate && endDate && AdPerDay && (
                    <h3>totalCost = {calculateTotalCost()}</h3>
                  )}
     
                  {isDateValid()}
                </div> 
              </div>
              <button onClick={handleSubmit} id="btn"  className="nextBtn" type="submit">
                <span className="btnText">Submit</span>
                <i className="uil uil-navigator"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking1;

