import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    skills: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    currentCompany: "",
    experience: "",
    education: "",
    recentProjects: [{ title: "", description: "" }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (e) => {
    setFormData({ ...formData, skills: e.target.value });
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.recentProjects];
    updatedProjects[index][name] = value;
    setFormData({ ...formData, recentProjects: updatedProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      recentProjects: [
        ...formData.recentProjects,
        { title: "", description: "" },
      ],
    });
  };

  const validateProjects = () => {
    return formData.recentProjects.every(
      (project) => project.title.trim() && project.description.trim()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateProjects()) {
      alert("Please fill out all project fields.");
      return;
    }

    setIsSubmitting(true);

    const userPayload = {
      name: formData.name,
      role: formData.role,
      bio: formData.bio,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      contactInformation: {
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      },
      professionalDetails: {
        currentCompany: formData.currentCompany,
        experience: formData.experience,
        education: formData.education,
      },
      recentProjects: formData.recentProjects,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/create-user`,
        userPayload
      );
      alert("User created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-200 p-5">
          <h1 className="text-2xl font-bold text-indigo-600">Add New User</h1>
        </header>
        <div className="p-5">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleSkillsChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              {/* Address Fields */}
              <div className="md:col-span-2 grid grid-cols-2 gap-6">
                {[
                  { name: "street", label: "Street" },
                  { name: "city", label: "City" },
                  { name: "state", label: "State" },
                  { name: "postalCode", label: "Postal Code" },
                  { name: "country", label: "Country" },
                ].map(({ name, label }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Company
                </label>
                <input
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            {/* Projects */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Projects
              </h3>
              {formData.recentProjects.map((project, index) => (
                <div key={index} className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">
                    Project {index + 1}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div>
                      <input
                        type="text"
                        name="title"
                        value={project.title}
                        onChange={(e) => handleProjectChange(index, e)}
                        placeholder="Project Title"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="description"
                        value={project.description}
                        onChange={(e) => handleProjectChange(index, e)}
                        placeholder="Project Description"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addProject}
                className="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-indigo-600 text-white py-2"
              >
                Add Another Project
              </button>
            </div>
            {/* Submit Button */}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-indigo-600 text-white py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding User..." : "Add User"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddUser;