'use client';

import { motion } from 'framer-motion';
import { animations, pageTransitions } from '@pharmify/ui';
import Link from 'next/link';

export default function Home() {
  return (
    <motion.main
      className="min-h-screen"
      initial={pageTransitions.fade.initial}
      animate={pageTransitions.fade.animate}
      exit={pageTransitions.fade.exit}
    >
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Content */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.9, 0.38, 1] }}
          >
            <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl lg:text-7xl">
              Your Pharmacy,
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-prescription-600 bg-clip-text text-transparent">
                Your Choice
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 md:text-2xl">
              Order from nearby stores for fast delivery, or find the cheapest
              prices across all pharmacies. The choice is yours.
            </p>
          </motion.div>

          {/* Split CTA Cards */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Nearby Store Card */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
              variants={animations.heroCardTilt}
              initial="initial"
              whileHover="whileHover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="mb-3 text-2xl font-bold text-gray-900">
                  Order from Nearby Store
                </h2>
                <p className="mb-6 text-gray-600">
                  Get your medicines delivered quickly from pharmacies near you.
                  Fast, reliable, and convenient.
                </p>
                <Link
                  href="/nearby"
                  className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Find Nearby Stores
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Cheapest Pharmacy Card */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
              variants={animations.heroCardTilt}
              initial="initial"
              whileHover="whileHover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-prescription-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-prescription-100 text-prescription-600">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="mb-3 text-2xl font-bold text-gray-900">
                  Order from Cheapest Pharmacy
                </h2>
                <p className="mb-6 text-gray-600">
                  Compare prices across all partner pharmacies and get the best
                  deal. Save money on every order.
                </p>
                <Link
                  href="/cheapest"
                  className="inline-flex items-center rounded-lg bg-prescription-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-prescription-700"
                >
                  Compare Prices
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Search Bar */}
          <motion.div
            className="mx-auto mt-16 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.9, 0.38, 1] }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for medicines, brands, or generics..."
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-6 py-4 pr-12 text-lg shadow-md transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary-600 p-2 text-white transition-colors hover:bg-primary-700">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}

