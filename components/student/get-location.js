import { useEffect, useState } from "react"

const GetLocation = ({ quizDetail, classDetail, location, checkLat, checkLon, setLocation, handleSubmit }) => {
    const [distance, setDistance] = useState(999999);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    const getDistance = calculateDistance(latitude, longitude, checkLat, checkLon);
                    setDistance(getDistance);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in kilometers
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance * 1000;
    };

    const toRadians = (angle) => {
        return (angle * Math.PI) / 180;
    };

    const reportFail = () => {
        console.log("reported to server")
    }


    return (
        <div className="content">
            <h1>Welcome to Class {classDetail.codename}!</h1>
            <p>Subject: {classDetail.subject} - {classDetail.semester}</p>
            <br />
            {location ? (
                <>
                    {distance <= 40 ? (
                        <div>
                            <p>Thank you. Press "Start" button below to continue</p>
                            <button type="submit" onClick={handleSubmit}>Start</button>
                        </div>
                    ) : (
                        <div>
                            <p>This seems like you are not at the class right now. You must be in the class to access to the quiz.</p>
                            <button onClick={reportFail}>Bye!</button>
                        </div>
                    )}
                </>
            ) : (
                <div>
                    <p>Before continuing, please grant access to your Location</p>
                    <button onClick={getLocation}>Get Location</button>
                </div>
            )
            }
        </div>
    );
};

export default GetLocation;