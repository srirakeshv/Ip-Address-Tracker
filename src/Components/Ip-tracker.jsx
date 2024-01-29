import React from "react";
import "./Ip-tracker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const IpTracker = () => {
  return (
    <div>
      <div
        className="topbar"
        style={{
          backgroundImage: "url('/Asset/images/pattern-bg-desktop.png')",
          backgroundPosition: "100%",
          backgroundSize: "100% 100%",
        }}
      >
        <h1>IP Address Tracker</h1>
        <form>
          <input
            type="text"
            placeholder="Search for any IP address or domain"
          />
          <button type="submit">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </form>
        <div className="informationbar">
          <div>
            <h6>IP ADDRESSES</h6>
            <p>192.212.174.101</p>
          </div>
          <div>
            <h6>LOCATION</h6>
            <p>Brooklyn, NY 10001</p>
          </div>
          <div>
            <h6>TIMEZONE</h6>
            <p>UTC-05:00</p>
          </div>
          <div className="info-last">
            <h6>ISP</h6>
            <p>SpaceX Starlink</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IpTracker;
