import { useState } from "react";
import ProfileContext from "../ProfileContext";

const ProfileProvider = ({ children }) => {
  const [profileInfo, setProfileInfo] = useState({
    gender: "",
    type: "",
    degree: 0,
    imgURL: "",
    age: 0,
    inoDate: null,
  });

  return (
    <ProfileContext.Provider
      value={{
        profileInfo,
        setProfileInfo,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
