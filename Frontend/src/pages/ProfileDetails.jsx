import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import Sidebar from "../components/Sidebar";

const ProfileDetails = () => {
  const { userId } = useParams();
  const { getUserById, loading } = useContext(StoreContext);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(userId);
        if (user) {
          setProfile(user);
        } else {
          setError("Profile not found");
        }
      } catch (err) {
        setError("Failed to fetch profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, getUserById]);

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="flex h-full bg-gray-100">
      <Sidebar />
      <div className="bg-[#E5E7EB] flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white border-neutral-200/20 p-4">
          <Link
            to="/"
            className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg inline-flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Profiles
          </Link>
        </header>
        <div className="mx-auto">
          <div className="bg-white border border-neutral-200/30">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-32 h-32 rounded-full bg-neutral-200 flex-shrink-0">
                  <img src="https://avatar.iran.liara.run/public/1" alt="" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-semibold">{profile.name}</h1>
                      <p className="text-neutral-500">{profile.role}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/map/${userId}`}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        Show on Map
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-neutral-600">{profile.bio}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm bg-neutral-100 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-5 h-5 mt-1 text-neutral-400 mr-3">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-neutral-600">
                          {profile.contactInformation.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-5 h-5 mt-1 text-neutral-400 mr-3">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-neutral-600">
                          {profile.contactInformation.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-5 h-5 mt-1 text-neutral-400 mr-3">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-neutral-600">
                          {profile.contactInformation.address.street}
                        </p>
                        <p className="text-neutral-600">
                          {profile.contactInformation.address.city},{" "}
                          {profile.contactInformation.address.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Professional Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Current Company</p>
                      <p className="text-neutral-600">
                        {profile.professionalDetails.currentCompany}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-neutral-600">
                        {profile.professionalDetails.experience}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Education</p>
                      <p className="text-neutral-600">
                        {profile.professionalDetails.education}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.recentProjects.map((project, index) => (
                    <div
                      key={index}
                      className="p-4 bg-neutral-50 rounded-lg border border-neutral-200/30"
                    >
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-neutral-600 mt-2">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
