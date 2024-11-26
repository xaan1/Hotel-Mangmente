
import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">About Our Hotel Management System</h1>
      <p className="text-lg text-gray-600 mb-4">
        Our Hotel Management System is a powerful and intuitive platform designed to streamline hotel
        operations, from booking rooms and managing reservations to tracking customer preferences. With
        easy-to-use features, hotel managers and staff can efficiently handle daily tasks while enhancing
        guest experiences.
      </p>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Key Features:</h2>
      <ul className="list-disc pl-6 text-lg text-gray-600">
        <li>Real-time room availability and booking management</li>
        <li>Guest profile management</li>
        <li>Payment gateway integration</li>
        <li>Reporting and analytics for better decision-making</li>
        <li>Multi-language and multi-currency support</li>
      </ul>
      <p className="mt-6 text-lg text-gray-600">
        Whether you are a small boutique hotel or a large luxury resort, our system is customizable to
        meet your specific needs.
      </p>
    </div>
  </div>
  );
}

export default AboutPage;
