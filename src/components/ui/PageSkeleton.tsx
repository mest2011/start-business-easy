import React from 'react';

export const PageSkeleton: React.FC = () => {
  return (
    <div className="w-full px-4 lg:px-8 py-8 h-full flex flex-col animate-pulse">
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col space-y-8">
        
        {/* Header Skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-3">
            <div className="h-10 bg-neutral-200 rounded w-64"></div>
            <div className="h-4 bg-neutral-200 rounded w-96"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-12 bg-neutral-200 rounded-lg w-32"></div>
            <div className="h-12 bg-neutral-300 rounded-lg w-40"></div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white border-2 border-neutral-100 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="h-4 bg-neutral-200 rounded w-24"></div>
                <div className="w-10 h-10 bg-neutral-100 rounded-lg"></div>
              </div>
              <div className="h-8 bg-neutral-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-neutral-100 rounded w-20"></div>
            </div>
          ))}
        </div>

        {/* Big Block Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          <div className="lg:col-span-2 bg-white border-2 border-neutral-100 rounded-xl p-6 h-96">
            <div className="h-6 bg-neutral-200 rounded w-48 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-14 bg-neutral-50 rounded w-full"></div>
              ))}
            </div>
          </div>
          <div className="bg-white border-2 border-neutral-100 rounded-xl p-6 h-96">
             <div className="h-6 bg-neutral-200 rounded w-32 mb-6"></div>
             <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-full"></div>
                  <div className="h-10 bg-neutral-50 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
