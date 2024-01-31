import React, { useState, useEffect, useRef } from "react";
import "./Ip-tracker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import bgimage from "./pattern-bg-desktop.png";

const IpTracker = () => {
  const [input, setInput] = useState("");
  const [map, setMap] = useState(null);
  const [ipInfo, setIpInfo] = useState({
    ipAddress: "",
    ipLocation: "",
    timezone: "",
    isp: "",
  });
  const mapRef = useRef(null);

  const initializeMap = () => {
    console.log("Initializing map");
    if (!mapRef.current) {
      const mapInstance = L.map("map").setView([0, 0], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapInstance);
      setMap(mapInstance);
      mapRef.current = mapInstance; // Set the ref to the initialized map
    }
  };

  const updateMapMarker = (lat, lng) => {
    console.log("Updating map marker", lat, lng);
    if (map && lat !== undefined && lng !== undefined) {
      map.setView([lat, lng], 13);
      L.marker([lat, lng]).addTo(map);
    }
  };

  useEffect(() => {
    initializeMap();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ipAddress = input;
    console.log(input);
    setInput("");

    try {
      const apiKey = "at_hWTq4MJXWbrFHCaBIte9jqni8bCRF";
      const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_hWTq4MJXWbrFHCaBIte9jqni8bCRF&ipAddress=${ipAddress}`;

      const reponse = await fetch(apiUrl);
      const data = await reponse.json();
      console.log(data);
      setIpInfo({
        ipAddress: data.ip,
        ipLocation: `${data.location.city}, ${data.location.country}`,
        timezone: `UTC${data.location.timezone}`,
        isp: data.isp,
      });
      const { lat, lng } = data.location;
      updateMapMarker(lat, lng);
    } catch (error) {
      console.error("Error fetching IP country information:", error);
    }
  };

  return (
    <div>
      <div
        className="topbar"
        style={{
          backgroundImage: `url('${bgimage}')`,
          backgroundPosition: "100%",
          backgroundSize: "100% 100%",
        }}
      >
        <h1>IP Address Tracker</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </form>
        <div className="informationbar">
          <div>
            <h6>IP ADDRESSES</h6>
            <p>{ipInfo.ipAddress || "192.212.174.101"}</p>
          </div>
          <div>
            <h6>LOCATION</h6>
            <p>{ipInfo.ipLocation || "Brooklyn, NY 10001"}</p>
          </div>
          <div>
            <h6>TIMEZONE</h6>
            <p>{ipInfo.timezone || "UTC-05:00"}</p>
          </div>
          <div className="info-last">
            <h6>ISP</h6>
            <p>{ipInfo.isp || "SpaceX Starlink"}</p>
          </div>
        </div>
      </div>
      <div id="map" className="leaflet-map"></div>
    </div>
  );
};

export default IpTracker;
