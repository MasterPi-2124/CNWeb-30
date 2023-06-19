import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

const QRModal = ({ startTime, endTime, url }) => {
    const [location, setLocation] = useState({});
    const [time, setTime] = useState(new Date().getTime());
    const end = new Date(endTime).getTime();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({
                        "lat": latitude,
                        "lon": longitude
                    })
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime + 1000);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (time >= end) {
            alert('Timer ended');
        }
    }, [time, end]);

    const timeRemaining = Math.max(0, end - time);
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);

    return (
        <div>
            <QRCodeSVG value={`${url}?lat=${location.lat}&lon=${location.lon}`} />
            <p>{`${minutes}:${seconds}`}</p>
        </div>
    )
}
export default QRModal;
