import React from 'react';
import ShowsSection from '../components/ShowsSection';
import ShowsSectionMobile from '../components/ShowsSectionMobile';

export default function Shows() {
  return (
    <>
      {/* 👇 Shows on screens smaller than md */}
      <div className="block md:hidden">
        <ShowsSectionMobile />
      </div>

      {/* 👇 Shows on md and up (desktop) */}
      <div className="hidden md:block">
        <ShowsSection />
      </div>
    </>
  );
}
