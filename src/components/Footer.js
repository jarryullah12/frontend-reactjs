import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-8 mt-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-lg font-bold">Travellogo</h2>
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
          <p className="mt-2">📍 Noida, Uttar Pradesh</p>
          <p>📞 +123 456 789</p>
          <div className="flex space-x-2 mt-2">
            <a href="#"><i className="fab fa-instagram text-xl"></i></a>
            <a href="#"><i className="fab fa-facebook text-xl"></i></a>
            <a href="#"><i className="fab fa-linkedin text-xl"></i></a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Important Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Best Places</a></li>
            <li><a href="#" className="hover:underline">Blogs</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Important Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Best Places</a></li>
            <li><a href="#" className="hover:underline">Blogs</a></li>
          </ul>
        </div>
      </div>
      <p className="text-center text-gray-600 mt-4">© Copyright 2024 All rights reserved || Made with ❤️ by TCJ</p>
    </footer>
  );
};

export default Footer;
