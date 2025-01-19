import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import Sidebar from "../components/Sidebar";
import MapComponent from "../components/MapComponent";

const Map = () => {
  const { userId } = useParams();
  const { getUserById, loading } = useContext(StoreContext);
  const [profile, setProfile] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const user = getUserById(userId);
    setProfile(user);
  }, [userId, getUserById]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const handleDirections = (data) => {
    setDirections(data);
  };

  const handleGetDirectionsClick = () => {
    document.getElementById("get-directions-button").click();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <section className="bg-white flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white border-neutral-200/20 p-5">
          <a
            href={`/profile/${userId}`}
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
          </a>
        </header>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3">
            <MapComponent
              address={`${profile.contactInformation.address.street}, ${profile.contactInformation.address.city}, ${profile.contactInformation.address.country}`}
              onDirections={handleDirections}
            />
          </div>
          <div className="lg:w-1/3 p-4">
            <div className="bg-white border border-neutral-200/30">
              <div className="p-4 border-b border-neutral-200/30">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Selected Profile</h2>
                  <button className="text-neutral-400 hover:text-neutral-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-200">
                    <img src="https://avatar.iran.liara.run/public/1" alt="" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{profile.name}</h3>
                    <p className="text-sm text-neutral-500">
                      {profile.contactInformation.address.city},{" "}
                      {profile.contactInformation.address.country}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-600 mb-2">
                      Address Details
                    </h4>
                    <div className="p-3 bg-neutral-50 rounded-lg text-sm">
                      <p>{profile.contactInformation.address.street}</p>
                      <p>{profile.contactInformation.address.city}</p>
                      <p>{profile.contactInformation.address.country}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-neutral-600 mb-2">
                      Contact Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <svg
                          className="w-4 h-4 text-neutral-400 mr-2"
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
                        {profile.contactInformation.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <svg
                          className="w-4 h-4 text-neutral-400 mr-2"
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
                        {profile.contactInformation.phone}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      onClick={handleGetDirectionsClick}
                    >
                      Get Directions
                    </button>
                    <button className="px-4 py-2 border border-neutral-200/30 rounded-lg hover:bg-neutral-50">
                      <svg
                        className="w-5 h-5 text-neutral-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {directions && (
              <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                <h2 className="text-lg font-semibold mb-2">Directions</h2>
                {directions.error ? (
                  <p>{directions.error}</p>
                ) : (
                  <>
                    <p>Distance: {directions.distance}</p>
                    <p>Duration: {directions.duration}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Map;