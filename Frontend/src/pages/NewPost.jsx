import React, { useState } from 'react';
import axios from 'axios';
import { topics } from '../data/data';

const NewPost = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    topics: [],
    userID: localStorage.getItem('userID'),
    image: null
  });
  const [topicInput, setTopicInput] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleTopicChange = (e) => {
    setTopicInput(e.target.value);
  };

  const handleAddTopic = () => {
    if (formData.topics.length < 5 && topicInput && !formData.topics.includes(topicInput)) {
      setFormData({
        ...formData,
        topics: [...formData.topics, topicInput]
      });
      setTopicInput('');
    }
  };

  const handleRemoveTopic = (index) => {
    setFormData({
      ...formData,
      topics: formData.topics.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append('title', formData.title)
      formDataForUpload.append('summary', formData.summary)
      formDataForUpload.append('content', formData.content)
      formDataForUpload.append('topics', JSON.stringify(formData.topics))
      formDataForUpload.append('userID', localStorage.getItem('userID'))
      formDataForUpload.append('image', formData.image)

      const response = await axios.post(backendURL + 'posts/add-post', formDataForUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      window.location.href = '/';
    }
    catch(err) {
      console.error(err);
    }
  };

  const token = localStorage.getItem('token');

  if(!token) {
    return <div>You need to be logged in to view this page</div>
  }

  return (
    <div className="px-[170px] mt-12 font-inter mb-14 flex flex-col items-center">
      <h2 className="mb-8 text-2xl font-semibold">New Post</h2>
      <form onSubmit={handleSubmit} className="max-w-xl w-1/2 mt-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="topicInput" className="block text-sm font-medium text-gray-700">
            Add Topics (max 5)
          </label>
          <div className="flex items-center">
            <select
              id="topicInput"
              value={topicInput}
              onChange={handleTopicChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>Select a topic</option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddTopic}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            {formData.topics.map((topic, index) => (
              <span key={index} className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full mr-2 mb-2">
                {topic}
                <button
                  type="button"
                  onClick={() => handleRemoveTopic(index)}
                  className="ml-2 text-red-500"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPost;
