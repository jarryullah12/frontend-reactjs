import React from "react";

const Blogs = () => {
  const blogs = [
    { title: "Top places to visit in India", date: "April 27, 2023", image: "/blog1.jpg" },
    { title: "Top places to visit in US", date: "April 27, 2023", image: "/blog2.jpg" },
    { title: "Top places to visit in Japan", date: "April 27, 2023", image: "/blog3.jpg" }
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Our Latest Blogs</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {blogs.map((blog, index) => (
          <div key={index} className="shadow-lg p-4 rounded">
            <img src={blog.image} alt={blog.title} className="rounded w-full h-40 object-cover"/>
            <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
            <p className="text-gray-600">{blog.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
