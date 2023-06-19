import { React, useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

const QRModal = ({ url }) => {
    const [location, setLocation] = useState({});
    
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

    return (
        <div>
            <QRCodeSVG value={`${url}?lat=${location.lat}&lon=${location.lon}`}/>
        </div>
    )
}
export default QRModal;
