import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import '../styles/font.css';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <Header />
      <SearchSection />
    </main>
  );
}





