"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800",
        className
      )}
    />
  );
}

export function SkeletonText({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-4 w-full", className)} />;
}

export function SkeletonHeading({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-8 w-48", className)} />;
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4",
        className
      )}
    >
      <Skeleton className="h-40 w-full rounded-xl" />
      <SkeletonHeading className="w-3/4" />
      <div className="space-y-2">
        <SkeletonText className="w-full" />
        <SkeletonText className="w-5/6" />
        <SkeletonText className="w-4/6" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonHero({ className }: SkeletonProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-6 py-20", className)}>
      {/* Avatar */}
      <Skeleton className="h-32 w-32 rounded-full" />
      {/* Name */}
      <Skeleton className="h-12 w-64" />
      {/* Title */}
      <Skeleton className="h-6 w-48" />
      {/* Description */}
      <div className="flex flex-col items-center gap-2 w-full max-w-md">
        <SkeletonText className="w-full" />
        <SkeletonText className="w-5/6" />
      </div>
      {/* Buttons */}
      <div className="flex gap-4">
        <Skeleton className="h-12 w-32 rounded-full" />
        <Skeleton className="h-12 w-32 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonTimeline({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-4 w-4 rounded-full flex-shrink-0 mt-1" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-24" />
            <SkeletonHeading className="w-3/4" />
            <SkeletonText className="w-full" />
            <SkeletonText className="w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonSkills({ className }: SkeletonProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", className)}>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-4 rounded-xl border border-stone-200 dark:border-stone-800"
        >
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonProjects({ className }: SkeletonProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
      {[...Array(4)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-stone-50/80 dark:bg-stone-950/80 border-b border-stone-200/50 dark:border-stone-800/50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-16 hidden md:block" />
            ))}
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-9 w-9 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 space-y-20">
        <SkeletonHero />
        <div className="space-y-8">
          <SkeletonHeading className="w-32 mx-auto" />
          <SkeletonTimeline />
        </div>
        <div className="space-y-8">
          <SkeletonHeading className="w-32 mx-auto" />
          <SkeletonSkills />
        </div>
        <div className="space-y-8">
          <SkeletonHeading className="w-32 mx-auto" />
          <SkeletonProjects />
        </div>
      </div>
    </div>
  );
}
