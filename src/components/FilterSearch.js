import React, { useState, useEffect } from 'react';
import './FilterSearch.css';


const FilterSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImpactArea, setSelectedImpactArea] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [dummyData, setDummyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('//localhost:5000/api/data'); // Make sure the server is running on the same URL
        const jsonData = await response.json();
        setDummyData([...dummyData, ...jsonData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleImpactAreaChange = (event) => {
    setSelectedImpactArea(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const filteredProducts = dummyData.filter((product) => {
    const isMatch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory) &&
      (selectedImpactArea === "All" ||
        product.impactArea === selectedImpactArea) &&
      (selectedLocation === "All" || product.location === selectedLocation);

    return isMatch;
  });

  const categories = [
    "All",
    "Advocacy",
    "Service",
    "Religious",
    "Community-Based",
    "Environmental",
    "Human Rights",
    "Health",
    "Education",
    "Research",
  ];

  const impactAreas = [
    "All",
    "Education",
    "Healthcare",
    "Poverty Alleviation",
    "Environment",
    "Women Empowerment",
    "Child Welfare",
    "Human Rights",
    "Disaster Relief",
    "Community Development",
    "Animal Welfare",
  ];

  const locations = [
    "All",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <div className="page">
    <div >
      <input
        type="text"
        className="form-control rounded"
        
        placeholder="Search NGO by name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="impactArea">Impact Area:</label>
        <select
          id="impactArea"
          value={selectedImpactArea}
          onChange={handleImpactAreaChange}
        >
          {impactAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <select
          id="location"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div>
        {filteredProducts.map((product) => (
          <div className="card" s key={product.id}>
          <div className="card-body">
            <h5 className="card-title"></h5>
            <h3>{product.name}</h3>
            <p>Impact Area: {product.impactArea}</p>
            <p>Location: {product.location}</p>
            <p>Category: {product.category}</p>
            <br></br>
            <a href="#" className="button">Go somewhere</a>
          </div>
        </div>
        ))}
      </div>
      </div>
    </div>
   
  );
};

export default FilterSearch;


