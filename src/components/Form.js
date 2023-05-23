import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [name, setName] = useState('');
  const [impactArea, setImpactArea] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the backend
      await axios.post('http://localhost:5000/submit', { name, impactArea, category, location });

      // Clear form fields
      setName('');
      setImpactArea('');
      setCategory('');
      setLocation('');

      // Show success message
      alert('Form submitted successfully');
    } catch (error) {
      // Show error message
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {/* Name: */}
        
        <input type="text" value={name} placeholder="Enter Name.." onChange={e => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Impact Area:
        <select value={impactArea} onChange={e => setImpactArea(e.target.value)}>
          <option value="">All</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Poverty Alleviation">Poverty Alleviation</option>
          <option value="Environment">Environment</option>
          <option value="Women Empowerment">Women Empowerment</option>
          <option value="Child Welfare">Child Welfare</option>
          <option value="Human Rights">Human Rights</option>
          <option value="Disaster Relief">Disaster Relief</option>
          <option value="Community Development">Community Development</option>
          <option value="Animal Welfare">Animal Welfare</option>
        </select>
      </label>
      <br />
      <label>
        Category:
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Advocacy">Advocacy</option>
          <option value="Service">Service</option>
          <option value="Religious">Religious</option>
          <option value="Community-Based">Community-Based</option>
          <option value="Environmental">Environmental</option>
          <option value="Human Rights">Human Rights</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Research">Research</option>
        </select>
      </label>
      <br />
      <label>
        Location:
        <select value={location} onChange={e => setLocation(e.target.value)}>
          <option value="">All</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
        </select>
      </label>
      <br />
      <button className="submit" type="submit" >Submit</button>
    </form>
  );
};

export default Form;
