import React from 'react';
import { useState } from 'react';

const shows = [
  { id: 1, date: 'August 15, 2025', venue: 'Indie Luna', location: 'Nashville, TN', isUpcoming: true },
  { id: 11, date: 'August 30, 2025', venue: "Eastside Bowl '58", location: 'Nashville, TN', isUpcoming: true },
  { id: 2, date: 'July 16, 2025', venue: 'Arcane Workshop', location: 'Madison, TN', isUpcoming: false },
  { id: 3, date: 'July 02, 2025', venue: 'JBJs', location: 'Nashville, TN', isUpcoming: false },
  { id: 4, date: 'June 27, 2025', venue: 'The Dollhouse', location: 'Mufreesboro, TN', isUpcoming: false },
  { id: 5, date: 'June 13, 2025', venue: 'The Vinyl Lounge', location: 'Nashville, TN', isUpcoming: false },
  { id: 6, date: 'May 24, 2025', venue: 'The Dollhouse', location: 'Murfreesboro, TN', isUpcoming: false },
  { id: 7, date: 'May 23, 2025', venue: 'Basement East', location: 'Nashville, TN', isUpcoming: false },
  { id: 8, date: 'April 10, 2025', venue: 'Bettys', location: 'Nashville, TN', isUpcoming: false },
  { id: 9, date: 'March 28, 2025', venue: 'High Ground', location: 'Nashville, TN', isUpcoming: false },
  { id: 10, date: 'January 30, 2025', venue: 'Springwater', location: 'Nashville, TN', isUpcoming: false },
];

export default function ShowsSection() {
  const upcoming = shows.filter(show => show.isUpcoming);
  const past = shows.filter(show => !show.isUpcoming);
  console.log("Showing mobile version");

  return (
    <section id="shows" className="bg-black text-white px-4 py-10 space-y-10">
      <img
        src="/images/band3.jpg"
        alt="Altalune Live Promo"
        className="w-full h-[300px] object-cover object-[center_25%] rounded-xl shadow-lg"
      />

      <h2 className="text-3xl font-extrabold tracking-tight uppercase text-altalune-orange">
        Shows
      </h2>

      {upcoming.length > 0 ? (
        <div className="space-y-6">
          {upcoming.map((show, index) => (
            <div
              key={show.id}
              className={`relative pl-4 border-l-4 ${
                index === 0
                  ? 'border-altalune-orange bg-altalune-orange/10 animate-pulse'
                  : 'border-gray-700'
              } hover:translate-x-2 transition-transform duration-200 ease-in-out`}
            >
              {index === 0 && (
                <span className="absolute -top-5 left-4 text-xs bg-altalune-orange text-black px-2 py-0.5 uppercase font-bold tracking-widest">
                  Next Show
                </span>
              )}
              <p className="text-base font-semibold">{show.date}</p>
              <p className="text-sm italic">{show.venue} — {show.location}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-base italic text-gray-400">
          No upcoming shows. <a href="mailto:booking@altalune.com" className="underline hover:text-altalune-orange">Book us now.</a>
        </p>
      )}

      <h3 className="text-lg uppercase text-gray-500 mt-10 mb-4">Past Shows</h3>
      <div className="space-y-3">
        {past.map(show => (
          <div key={show.id} className="opacity-50 hover:opacity-80 transition-opacity duration-200 border-b border-gray-700 pb-2">
            <p className="text-sm">{show.date} — <span className="font-medium">{show.venue}</span>, {show.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
