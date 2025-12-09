// Shows.jsx
import React, { useEffect, useState } from "react";
import { client } from "../sanityClient";
import ShowsSection from "../components/ShowsSection";
import ShowsSectionMobile from "../components/ShowsSectionMobile";

const SHOWS_QUERY = `*[_type == "show"] | order(date asc) {
  _id,
  date,
  venue,
  location,
  ticketUrl,
  hasPresale
}`;

function isUpcoming(dateString) {
  const showDate = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return showDate >= today;
}

export default function Shows() {
  const [cmsShows, setCmsShows] = useState([]);

  // Static shows remain
  const staticShows = [
    { id: 13, date: "November 07, 2025", venue: "5 Spot", location: "Nashville, TN", hasPresale: false },
    { id: 12, date: "September 05, 2025", venue: "Twisted Tea Garden", location: "Madison, TN", hasPresale: false },
    { id: 11, date: "August 30, 2025", venue: "Eastside Bowl '58", location: "Nashville, TN", ticketUrl: "https://www.eventim.us/event/the-58-altalune/658352", hasPresale: true },
    { id: 10, date: "August 15, 2025", venue: "Indie Luna", location: "Nashville, TN", hasPresale: false },
    { id: 9, date: "July 16, 2025", venue: "Arcane Workshop", location: "Madison, TN" },
    { id: 8, date: "July 02, 2025", venue: "JBJs", location: "Nashville, TN" },
    { id: 7, date: "June 27, 2025", venue: "The Dollhouse", location: "Mufreesboro, TN" },
    { id: 6, date: "June 13, 2025", venue: "The Vinyl Lounge", location: "Nashville, TN" },
    { id: 5, date: "May 24, 2025", venue: "The Dollhouse", location: "Murfreesboro, TN" },
    { id: 4, date: "May 23, 2025", venue: "Basement East", location: "Nashville, TN" },
    { id: 3, date: "April 10, 2025", venue: "Bettys", location: "Nashville, TN" },
    { id: 2, date: "March 28, 2025", venue: "High Ground", location: "Nashville, TN" },
    { id: 1, date: "January 30, 2025", venue: "Springwater", location: "Nashville, TN" },
  ];

  useEffect(() => {
    client
      .fetch(SHOWS_QUERY)
      .then((data) => setCmsShows(data || []))
      .catch((err) => console.error("Sanity fetch error:", err));
  }, []);

  const normalizedCms = cmsShows.map((show) => ({
    ...show,
    id: show._id,
    hasPresale: typeof show.hasPresale === "boolean" ? show.hasPresale : !!show.ticketUrl,
  }));

  const allShows = [...staticShows, ...normalizedCms];

  const upcoming = allShows
    .filter((s) => isUpcoming(s.date))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const past = allShows
    .filter((s) => !isUpcoming(s.date))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      {/* MOBILE */}
      <div className="block md:hidden">
        <ShowsSectionMobile upcoming={upcoming} past={past} />
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block">
        <ShowsSection upcoming={upcoming} past={past} />
      </div>
    </>
  );
}
