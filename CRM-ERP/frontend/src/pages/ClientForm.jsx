import React, { useState } from 'react';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    queryType: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 📦 Backend payload
    const payload = {
      ...formData,
      submittedAt: new Date()
    };

    console.log('Form submitted:', payload);
    alert('Form submitted successfully! (Backend pending)');

    // TODO: Connect with backend API like:
    // axios.post('/api/query', payload).then(res => ...)
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Raise a Query / Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Your Name" className="w-full border px-4 py-2 rounded" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="w-full border px-4 py-2 rounded" onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Phone Number" className="w-full border px-4 py-2 rounded" onChange={handleChange} required />
        <input name="company" type="text" placeholder="Company Name" className="w-full border px-4 py-2 rounded" onChange={handleChange} required />
        
        <select name="queryType" className="w-full border px-4 py-2 rounded" onChange={handleChange} required>
          <option value="">Select Query Type</option>
          <option value="Technical">Technical</option>
          <option value="Payment">Payment</option>
          <option value="General">General</option>
          <option value="Appointment">Appointment</option>
        </select>

        <textarea name="message" placeholder="Describe your issue..." className="w-full border px-4 py-2 rounded h-24" onChange={handleChange} required />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
