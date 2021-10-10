import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

// age,
//                     gender,
//                     degree,
//                     inoDate: new Date.parse(inoDate).toISOString(), // 날짜 데이터 타입 문제
//                     profileImage: img.location,
//                     verified: true,
function App() {
    const [age, setAge] = useState(0);
    const [degree, setDegree] = useState(0);
    const [inoDate, setInoDate] = useState(null);
    const [profileImage, setProfileImage] = useState("");

    const onChangeAge = (event) => {
        const { value } = event.target;
        setAge(value);
        console.log(value);
    };

    const onChangeDegree = (event) => {
        const { value } = event.target;
        setDegree(value);
        console.log(value);
    };

    const onChangeInoDate = (event) => {
        const { value } = event.target;
        setInoDate(value);
        console.log(value);
    };

    const onChangeProfileImage = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        console.log(imageUrl);
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    name="age"
                    placeholder="age"
                    onChange={onChangeAge}
                />
                <input
                    type="text"
                    name="degree"
                    placeholder="degree"
                    onChange={onChangeDegree}
                />
                <input
                    type="text"
                    name="inoDate"
                    placeholder="inoDate"
                    onChange={onChangeInoDate}
                />
                <input
                    name="profileImage"
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    onChange={onChangeProfileImage}
                />
                <button>버튼</button>
            </div>
        </>
    );
}

export default App;
