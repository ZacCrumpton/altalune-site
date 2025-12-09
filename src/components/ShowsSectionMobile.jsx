// ShowsSectionMobile.jsx
import React from "react";

export default function ShowsSectionMobile({ upcoming, past }) {
  return (
    <section id="shows" className="bg-black text-white px-4 py-10 space-y-10">
      <img
        src="/images/band3.webp"
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
                  ? "border-altalune-orange bg-altalune-orange/10 animate-pulse"
                  : "border-gray-700"
              } transition`}
            >
              {index === 0 && (
                <span className="absolute -top-5 left-4 text-xs bg-altalune-orange text-black px-2 py-0.5 uppercase font-bold tracking-widest">
                  Next Show
                </span>
              )}

              <p className="text-base font-semibold">{show.date}</p>
              <p className="text-sm italic">{show.venue} — {show.location}</p>

              {show.hasPresale && show.ticketUrl ? (
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block rounded-xl border border-altalune-orange text-altalune-orange hover:bg-altalune-orange hover:text-black text-xs px-3 py-1 font-semibold transition"
                >
                  Tickets
                </a>
              ) : (
                <span className="mt-2 block text-xs italic text-gray-500">No presale</span>
              )}
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
        {past.map((show) => (
          <div key={show.id} className="opacity-50 hover:opacity-80 transition border-b border-gray-700 pb-2">
            <p className="text-sm">
              {show.date} — <span className="font-medium">{show.venue}</span>, {show.location}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
