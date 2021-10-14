import { useState } from "react";
import ProfileContext from "../ProfileContext";

const ProfileProvider = ({ children }) => {
    const [profileInfo, setProfileInfo] = useState({
        age: 0,
        gender: "",
        type: "",
        degree: 0,
        imgURL: "",
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
