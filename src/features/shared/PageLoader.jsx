function Skeleton({ className = "", style, ...props }) {
  return (
    <div
      className={`animate-pulse bg-gray-200/80 rounded-lg ${className}`}
      style={style}
      aria-hidden="true"
      {...props}
    />
  );
}

function SkeletonCircle({ size = 40, className = "" }) {
  return (
    <Skeleton
      className={`rounded-full shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

function SkeletonText({ lines = 3, className = "" }) {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-3.5 ${i === lines - 1 ? "w-3/4" : "w-full"} ${i === 0 ? "w-[92%]" : ""}`}
        />
      ))}
    </div>
  );
}

export function ProfileHeaderSkeleton() {
  return (
    <div className="bg-white border border-[#e7eaf4] rounded-[18px] shadow-[0_1px_2px_rgba(23,26,64,.05),0_10px_28px_rgba(23,26,64,.07)] overflow-hidden animate-pulse">
      <Skeleton className="h-37.5 rounded-none w-full bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />
      <div className="px-6.5 pb-6.5 flex gap-5 flex-wrap items-start">
        <div className="-mt-13 relative">
          <SkeletonCircle
            size={118}
            className="border-4 border-white shadow-[0_8px_24px_rgba(23,26,64,.18)] bg-gray-200"
          />
        </div>

        <div className="flex-1 min-w-65 pt-3.5 flex flex-col gap-3">
          <Skeleton className="h-7 w-48 rounded-lg" />
          <Skeleton className="h-4 w-72 max-w-full rounded-lg bg-indigo-100/70" />
          <div className="flex flex-wrap gap-2 mt-1">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full bg-emerald-100/60" />
          </div>
          <div className="flex flex-col gap-2 mt-2 max-w-165">
            <Skeleton className="h-3.5 w-full rounded" />
            <Skeleton className="h-3.5 w-[92%] rounded" />
          </div>
        </div>

        <div className="flex gap-2.5 flex-wrap pt-4.5 mr-auto w-full lg:w-auto">
          <Skeleton className="h-10.5 w-32 rounded-xl" />
          <Skeleton className="h-10.5 w-32 rounded-xl bg-white border border-gray-200" />
          <Skeleton className="h-10.5 w-28 rounded-xl bg-white border border-gray-200" />
        </div>
      </div>
    </div>
  );
}

function CardSkeleton({ children, className = "" }) {
  return (
    <div
      className={`bg-white border border-[#e7eaf4] rounded-[18px] shadow-[0_1px_2px_rgba(23,26,64,.05),0_10px_28px_rgba(23,26,64,.07)] p-5.5 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeadSkeleton({ withAction = false }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <Skeleton className="w-9.5 h-9.5 rounded-xl bg-indigo-50 shrink-0" />
      <Skeleton className="h-5 w-28 rounded-lg" />
      {withAction && <Skeleton className="h-8 w-20 rounded-xl mr-auto" />}
    </div>
  );
}

export function CompletionSkeleton() {
  return (
    <CardSkeleton>
      <SectionHeadSkeleton />
      <Skeleton className="h-2 w-full rounded-full mt-1" />
      <Skeleton className="h-3.5 w-[85%] rounded mt-3" />
      <div className="flex flex-col gap-2 mt-4">
        <Skeleton className="h-8 w-full rounded-xl bg-amber-50 border border-amber-100" />
        <Skeleton className="h-8 w-full rounded-xl bg-amber-50 border border-amber-100" />
      </div>
    </CardSkeleton>
  );
}

export function InfoRowsSkeleton({ rows = 5 }) {
  return (
    <CardSkeleton>
      <SectionHeadSkeleton />
      <div className="flex flex-col">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 py-3 border-b border-dashed border-[#edeff7] last:border-0"
          >
            <Skeleton className="w-8 h-8 rounded-[10px] bg-[#f2f4fb] shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
              <Skeleton className="h-2.5 w-16 rounded" />
              <Skeleton className="h-3.5 w-32 rounded" />
            </div>
          </div>
        ))}
      </div>
    </CardSkeleton>
  );
}

export function SkillsSkeleton() {
  return (
    <CardSkeleton>
      <SectionHeadSkeleton />
      <div className="flex flex-col gap-5">
        {[1, 2].map((cat) => (
          <div key={cat}>
            <Skeleton className="h-3 w-24 rounded mb-3" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-3.5 w-24 rounded" />
                    <Skeleton className="h-5 w-14 rounded-full bg-indigo-50" />
                  </div>
                  <Skeleton className="h-1.5 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardSkeleton>
  );
}

export function TagsSkeleton({ count = 6 }) {
  return (
    <CardSkeleton>
      <SectionHeadSkeleton />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-7 rounded-full"
            style={{ width: `${58 + (i % 3) * 22}px` }}
          />
        ))}
      </div>
    </CardSkeleton>
  );
}

export function LanguagesSkeleton() {
  return (
    <CardSkeleton>
      <SectionHeadSkeleton withAction />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border border-[#eceef8] rounded-xl p-3 bg-[#fdfdff] flex justify-between items-center"
          >
            <Skeleton className="h-3.5 w-20 rounded" />
            <Skeleton className="h-5 w-16 rounded-full bg-indigo-50" />
          </div>
        ))}
      </div>
    </CardSkeleton>
  );
}

export function AboutSkeleton() {
  return (
    <CardSkeleton>
      <SectionHeadSkeleton />
      <div className="flex flex-col gap-2.5">
        <Skeleton className="h-3.5 w-full rounded" />
        <Skeleton className="h-3.5 w-full rounded" />
        <Skeleton className="h-3.5 w-[88%] rounded" />
        <Skeleton className="h-3.5 w-[78%] rounded" />
      </div>
    </CardSkeleton>
  );
}

export function TimelineSkeleton({ items = 2 }) {
  return (
    <CardSkeleton>
      <SectionHeadSkeleton withAction />
      <div className="relative pr-7 flex flex-col gap-4.5 border-r-2 border-[#e4e7f3]/60 mr-2.5 py-1">
        {Array.from({ length: items }).map((_, i) => (
          <div
            key={i}
            className="relative border border-[#eceef8] rounded-xl p-4 bg-[#fdfdff] flex flex-col gap-2.5"
          >
            <span className="absolute -right-6.5 top-3 w-3 h-3 rounded-full bg-white border-[3px] border-indigo-500 shadow-[0_0_0_3px_white]" />
            <Skeleton className="h-4 w-40 rounded" />
            <Skeleton className="h-3 w-28 rounded bg-indigo-50" />
            <div className="flex gap-2 flex-wrap">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
            <div className="flex flex-col gap-1.5 pt-1">
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-[85%] rounded" />
            </div>
            <div className="flex gap-1.5 flex-wrap pt-1">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </CardSkeleton>
  );
}

export function ProjectsSkeleton({ count = 3 }) {
  return (
    <CardSkeleton>
      <SectionHeadSkeleton withAction />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="border border-[#eceef8] rounded-2xl overflow-hidden bg-white flex flex-col"
          >
            <Skeleton className="h-35 w-full rounded-none bg-linear-to-br from-[#e0e7ff] to-[#ede9fe]" />
            <div className="p-4 flex flex-col gap-2.5 flex-1">
              <div className="flex justify-between items-start gap-2">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-5 w-14 rounded-full bg-indigo-50" />
              </div>
              <SkeletonText lines={2} />
              <div className="flex gap-1.5 flex-wrap">
                <Skeleton className="h-6 w-14 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
              <div className="flex gap-2 mt-auto pt-2">
                <Skeleton className="h-8 w-24 rounded-[10px]" />
                <Skeleton className="h-8 w-20 rounded-[10px] bg-white border border-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardSkeleton>
  );
}

export function ListCardsSkeleton({ items = 2 }) {
  return (
    <CardSkeleton>
      <SectionHeadSkeleton withAction />
      <div className="flex flex-col gap-3.5">
        {Array.from({ length: items }).map((_, i) => (
          <div
            key={i}
            className="border border-[#eceef8] rounded-xl p-4 bg-[#fdfdff] flex flex-col gap-2.5"
          >
            <Skeleton className="h-4 w-44 rounded" />
            <Skeleton className="h-3 w-32 rounded bg-indigo-50" />
            <div className="flex gap-2">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-3 w-24 rounded" />
            </div>
            <Skeleton className="h-3 w-full rounded" />
          </div>
        ))}
      </div>
    </CardSkeleton>
  );
}

export function ProfilePageSkeleton() {
  return (
    <div
      dir="rtl"
      className="max-w-295 mx-auto px-4.5 py-6 pb-30 flex flex-col gap-5.5 animate-pulse"
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="در حال بارگذاری پروفایل"
    >
      <span className="sr-only">در حال بارگذاری پروفایل...</span>

      <ProfileHeaderSkeleton />

      <div className="grid grid-cols-1 lg:grid-cols-[330px_minmax(0,1fr)] gap-5.5 items-start">
        <aside className="flex flex-col gap-5.5 min-w-0">
          <CompletionSkeleton />
          <InfoRowsSkeleton rows={5} />
          <LanguagesSkeleton />
          <SkillsSkeleton />
          <TagsSkeleton count={6} />
          <InfoRowsSkeleton rows={4} />
        </aside>

        <main className="flex flex-col gap-5.5 min-w-0">
          <AboutSkeleton />
          <TimelineSkeleton items={2} />
          <TimelineSkeleton items={2} />
          <ListCardsSkeleton items={3} />
          <ProjectsSkeleton count={3} />
          <ListCardsSkeleton items={2} />
          <ListCardsSkeleton items={3} />
        </main>
      </div>
    </div>
  );
}

export default ProfilePageSkeleton;
