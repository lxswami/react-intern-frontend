import React from "react";

const Home = () => {
    const dummyBlogs = [
        {
            id: 1,
            title: "How to Start Blogging in 2025",
            summary: "A quick guide to help you start your blogging journey with the right tools and mindset.",
            author: "Laxman Swami",
            date: "July 2, 2025",
        },
        {
            id: 2,
            title: "10 Writing Tips for Beginner Bloggers",
            summary: "Learn how to write compelling articles and grow your audience.",
            author: "Jane Doe",
            date: "June 28, 2025",
        },
        {
            id: 3,
            title: "Why Consistency Matters in Blogging",
            summary: "Understand how regular posting can help you build trust and traction.",
            author: "John Smith",
            date: "June 20, 2025",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section className="bg-white py-16 px-4 text-center">
                <h1 className="text-5xl font-bold text-blue-700 mb-4">Welcome to BlogVerse</h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Discover ideas, stories, and insights from writers around the world. Start reading or create your own blog today.
                </p>
                <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                    Create Your First Blog
                </button>
            </section>

            {/* Blog Preview Section */}
            <section className="py-12 px-4">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Latest Posts</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {dummyBlogs.map((blog) => (
                        <div key={blog.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-blue-700 mb-2">{blog.title}</h3>
                            <p className="text-gray-600 mb-3">{blog.summary}</p>
                            <div className="text-sm text-gray-500">
                                By <span className="font-medium">{blog.author}</span> | {blog.date}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-700 text-white py-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Join our community of writers</h2>
                <p className="mb-6">Share your voice and connect with readers across the globe.</p>
                <button className="bg-white text-blue-700 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition">
                    Get Started
                </button>
            </section>
        </div>
    );
};

export default Home;
