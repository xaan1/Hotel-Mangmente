
import React, { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., sending to a server)
        console.log(formData);
      };
    
      return (
        <div className="min-h-screen bg-gray-100 py-8">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600 mb-4">
              We would love to hear from you! If you have any questions or feedback, feel free to reach out.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="text-sm text-gray-600 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full"
                  placeholder="Enter your message"
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="bg-blue-500 text-white p-3 rounded-md w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      );
}

export default ContactPage;
