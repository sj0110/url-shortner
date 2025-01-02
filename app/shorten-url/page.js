"use client"; // Mark this file as a client-side component
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import { IoCopyOutline, IoCopy } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

// Import Toastify CSS for proper styling
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [urlArr, setUrlArr] = useState([]);
  const [copiedCell, setCopiedCell] = useState(null);
  const [form, setForm] = useState({
    url: '',
    urlText: '',
    generated: ''
  });
  const [errors, setErrors] = useState({
    url: '',
    urlText: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "url") {
      if (value && !/^https?:\/\/[^\s]+$/.test(value)) {
        error = "Please enter a valid URL.";
      }
    }

    if (name === "urlText") {
      if (!/^[a-zA-Z0-9]*$/.test(value)) {
        error = "Username must be alphanumeric.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const API_BASE_URL = "/api/generate"; // Update the base URL to match Next.js API routes

  const handleCopy = (text, index, field) => {
    toast.success('Copied to clipboard!', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    navigator.clipboard.writeText(text);
    setCopiedCell({ index, field });
    setTimeout(() => setCopiedCell(null), 100);
  };

  const fetchURLs = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const response = await res.json();
      if (!response.error) {
        setUrlArr(response.data); // Update the state with the new URL list
      } else {
        console.error("Failed to fetch URLs", response.message);
      }
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  useEffect(() => {
    fetchURLs();
  }, []);

  const handleDelete = async (index) => {
    try {
      const uuid = urlArr[index].uuid; // Use the UUID field for deletion
      const response = await fetch(`${API_BASE_URL}?uuid=${uuid}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete URL.");
      }

      setUrlArr((prev) => prev.filter((_, idx) => idx !== index));
    } catch (error) {
      console.error("Error deleting URL:", error);
      toast.error("Failed to delete URL.", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
      });
    }
  };

  const handleEdit = (index) => {
    const { url, urlText, generated } = urlArr[index];
    if (form.url !== "" || form.urlText !== "") {
      if (window.confirm("You have unsaved changes. Do you want to discard them?")) {
        setForm({ url, urlText, generated });
        handleDelete(index);
      }
    } else {
      setForm({ url, urlText, generated });
      handleDelete(index);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { url, urlText } = form;

    if (!url.trim() || !urlText.trim()) {
      alert("Make sure to enter all the required fields");
      return;
    }

    if (errors.url || errors.urlText) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      urlText: urlText,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        fetchURLs();
        setForm({
          url: '',
          urlText: '',
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="mt-10 space-y-6 mx-5 md:mx-auto md:w-full max-w-screen-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 box-border">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="url" className="block mb-2 text-sm sm:text-base font-bold text-gray-900 dark:text-white">Website URL</label>
            <input
              onChange={handleChange}
              type="url"
              value={form.url}
              name="url"
              id="url"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://www.example.com"
              required
            />
            {errors.url && (
              <p className="text-red-500 text-xs ml-2 mt-2">{errors.url}</p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="urlText" className="block mb-2 text-sm sm:text-base font-bold text-gray-900 dark:text-white">Preferred shortened URL text</label>
            <input
              onChange={handleChange}
              type="text"
              value={form.urlText}
              name="urlText"
              id="urlText"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Text Input (A-Z, a-z, 0-9)"
              required
            />
            {errors.urlText && (
              <p className="text-red-500 text-xs ml-2 mt-2">{errors.urlText}</p>
            )}
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>

      <ToastContainer
        position="top-bottom"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        closeButton={false}
        toastStyle={{
          backgroundColor: '#ffffff',
          color: '#3B81F6',
          borderRadius: '100px',
          width: 'fit-content',
          padding: '0px 20px',
          marginBottom: '70px'
        }}
      />

      <div className="overflow-x-auto">
      <table className="w-full mt-10 space-y-6 mx-5 sm:mx-auto sm:w-full max-w-screen-md p-4 bg-gray-800 text-white rounded-lg shadow sm:p-6 md:p-8 border border-gray-700 overflow-hidden box-border">
  <thead className="sticky top-0 bg-blue-600 text-white">
    <tr>
      <th className="py-2 px-3 text-sm md:text-base border-b border-r border-gray-700 w-[43%]">Website URL</th>
      <th className="py-2 px-3 text-sm md:text-base border-b border-r border-gray-700 w-[43%]">Generated URL</th>
      <th className="py-2 px-3 text-sm md:text-base border-b border-r border-gray-700 w-[14%]">Actions</th>
    </tr>
  </thead>
  <tbody>
    {urlArr.length === 0 ? (
      <tr>
        <td colSpan="3" className="text-center py-4 text-gray-500 text-sm md:text-base border-b border-r border-gray-700">
          No saved URLs to show
        </td>
      </tr>
    ) : (
      urlArr.map((item, index) => (
        <tr key={item._id} className="border-b border-gray-700">
          <td className="py-2 px-3 text-sm md:text-base border-b border-r border-gray-700 w-1/2">
            <div className="flex justify-between items-center gap-2">
              <Link href={item.url} target="_blank" className="text-blue-400 hover:underline max-w-[98%] truncate text-sm md:text-base" title={item.url}>
                {item.url}
              </Link>
              <button
                onClick={() => handleCopy(item.url, index, "url")}
                className="text-gray-500 hover:text-blue-500 hover:outline-blue-500"
              >
                {copiedCell?.index === index && copiedCell?.field === "url" ? (
                  <IoCopy className="text-blue-500" />
                ) : (
                  <IoCopyOutline />
                )}
              </button>
            </div>
          </td>
          <td className="py-2 px-3 text-sm md:text-base border-b border-r border-gray-700 w-1/2">
            <div className="flex justify-between items-center gap-2">
              <Link href={item.generated} target="_blank" className="text-blue-400 hover:underline max-w-[98%] truncate text-sm md:text-base" title={item.generated}>
                {item.generated}
              </Link>
              <button
                onClick={() => handleCopy(item.generated, index, "generated")}
                className="text-gray-500 hover:text-blue-500 hover:outline-blue-500"
              >
                {copiedCell?.index === index && copiedCell?.field === "generated" ? (
                  <IoCopy className="text-blue-500" />
                ) : (
                  <IoCopyOutline />
                )}
              </button>
            </div>
          </td>
          <td className="py-2 px-3 text-sm md:text-base border-b border-r border-gray-700">
            <div className="flex gap-2 items-center justify-around">
              <button
                onClick={() => {
                  if(window.confirm("Are you sure you want to delete this URL?")) {
                    handleDelete(index);
                    toast.info("URL deleted successfully!", {
                      position: "bottom-right",
                      autoClose: 2000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      theme: "colored",
                    });
                  }
                }}
                className="text-red-600 text-sm md:text-base"
              >
                <AiOutlineDelete />
              </button>
              <button
                onClick={() => handleEdit(index)}
                className="text-blue-600 text-sm md:text-base"
              >
                <FaRegEdit />
              </button>
            </div>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>


      </div>
    </>
  );
};

export default Page;
