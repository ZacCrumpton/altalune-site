import React from 'react';
import { useState } from 'react';

function isUpcoming(dateString) {
  const showDate = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return showDate >= today;
}

const shows = [
  {
    id: 13,
    date: 'November 07, 2025',
    venue: "5 Spot",
    location: 'Nashville, TN',
    ticketUrl: '',
    hasPresale: false,
  },
  {
    id: 12,
    date: 'September 05, 2025',
    venue: "Twisted Tea Garden",
    location: 'Madison, TN',
    ticketUrl: '',
    hasPresale: false,
  },
  {
 id: 11,
    date: 'August 30, 2025',
    venue: "Eastside Bowl '58",
    location: 'Nashville, TN',
    ticketUrl: 'https://www.eventim.us/event/the-58-altalune/658352',
    hasPresale: true,
  },
  {
     id: 10,
    date: 'August 15, 2025',
    venue: 'Indie Luna',
    location: 'Nashville, TN',
    ticketUrl: '',
    hasPresale: false
  },
  {
    id: 9,
    date: 'July 16, 2025',
    venue: 'Arcane Workshop',
    location: 'Madison, TN',
  },
  {
    id: 8,
    date: 'July 02, 2025',
    venue: 'JBJs',
    location: 'Nashville, TN',
  },
  {
    id: 7,
    date: 'June 27, 2025',
    venue: 'The Dollhouse',
    location: 'Mufreesboro, TN',
  },
  {
    id: 6,
    date: 'June 13, 2025',
    venue: 'The Vinyl Lounge',
    location: 'Nashville, TN',
  },
  {
    id: 5,
    date: 'May 24, 2025',
    venue: 'The Dollhouse',
    location: 'Murfreesboro, TN',
  },
  {
    id: 4,
    date: 'May 23, 2025',
    venue: 'Basement East',
    location: 'Nashville, TN',
  },
  {
    id: 3,
    date: 'April 10, 2025',
    venue: 'Bettys',
    location: 'Nashville, TN',
  },
  {
    id: 2,
    date: 'March 28, 2025',
    venue: 'High Ground',
    location: 'Nashville, TN',
  },
  {
    id: 1,
    date: 'January 30, 2025',
    venue: 'Springwater',
    location: 'Nashville, TN',
  },
];

export default function ShowsSection() {
  const upcoming = shows.filter(show => isUpcoming(show.date));
  const past = shows.filter(show => !isUpcoming(show.date));
  console.log("Showing desktop version");

  return (
    <section id="shows" className="bg-black text-white px-0 py-20">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Left: Photo (1/3) */}
        <div className="col-span-1 px-6 mb-10 md:mb-0">
          <img
            src="/images/band3.webp"
            alt="Altalune Live Promo"
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Right: Show List (2/3) */}
        <div className="col-span-2 px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-altalune-orange mb-10">
            Shows
          </h2>

          {upcoming.length > 0 ? (
            <div className="space-y-6 mb-16">
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
                  <p className="text-xl font-semibold">{show.date}</p>
                  <p className="text-lg italic">{show.venue} — {show.location}</p>
                  {show.hasPresale && show.ticketUrl ? (
                    <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block rounded-xl border border-altalune-orange text altalune-orange hover:bg-altalune-orange hover:text-black text-xs px-3 py-1 font-semibold transition"
                  >
                    Tickets
                  </a>
                  ) : (
                    <span className='mt-2 block text-xs italic text-grey-500'>No presale</span>
                  )}
                  
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg italic text-gray-400 mb-16">
              No upcoming shows. <a href="mailto:altalunemusic22@gmail.com" className="underline hover:text-altalune-orange">Book us now.</a>
            </p>
          )}

          <h3 className="text-2xl uppercase text-gray-500 mb-4">Past Shows</h3>
          <div className="grid gap-4">
            {past.map(show => (
              <div key={show.id} className="opacity-50 hover:opacity-80 transition-opacity duration-200 border-b border-gray-700 pb-2">
                <p className="text-md">{show.date} — <span className="font-medium">{show.venue}</span>, {show.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    
  );
}
