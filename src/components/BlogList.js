import React from "react";

const BlogList = () => {
  const blogs = [
    {
      title: "The 10 best places to visit in India",
      date: "April, 2022",
      author: "John Doe",
      image: "/tajmahal.jpg",
      description: "Lorem ipsum dolor, sit amet consectetur adipiscing elit..."
    },
    {
      title: "Top places to visit in US",
      date: "April 22, 2022",
      author: "Someone",
      image: "/maldives.jpg",
      description: "Lorem ipsum dolor, sit amet consectetur adipiscing elit..."
    },
    {
      title: "Top places to visit in Japan",
      date: "April 22, 2022",
      author: "Someone",
      image: "/japan.jpg",
      description: "Lorem ipsum dolor, sit amet consectetur adipiscing elit..."
    }
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Our Latest Blogs</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {blogs.map((blog, index) => (
          <div key={index} className="shadow-lg p-4 rounded-lg bg-white">
            <img src={blog.image} alt={blog.title} className="rounded w-full h-40 object-cover"/>
            <p className="text-gray-500 mt-2">{blog.date} &nbsp; by <span className="text-blue-500">{blog.author}</span></p>
            <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
            <p className="text-gray-600">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
