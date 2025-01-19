import React from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg border border-neutral-200/30">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-neutral-200">
              <img src="https://avatar.iran.liara.run/public/1" alt="" />
            </div>
            <div>
              <h3 className="font-semibold">{profile.name}</h3>
              <p className="text-sm text-neutral-500">
                {profile.contactInformation.address.city},
                {profile.contactInformation.address.country}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-neutral-600">{profile.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.skills.map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="px-2 py-1 text-xs bg-neutral-100 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="border-neutral-200/30 rounded-b-lg flex justify-center">
        <Link
          to={`/profile/${profile._id}`}
          className="rounded-b-lg text-indigo-600 text-base w-full text-center px-6 py-4 hover:bg-indigo-200 hover:text-white"
        >
          {"View Profile"}
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;