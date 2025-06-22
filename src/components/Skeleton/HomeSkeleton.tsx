import SkeletonBox from "./SkeletonBox";

export default function HomeSkeleton() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <SkeletonBox className="h-10 w-1/2 mx-auto mb-8" />
        <div className="flex flex-row items-center gap-2 mb-4">
          <SkeletonBox className="h-10 w-32" />
          <SkeletonBox className="h-10 w-32" />
        </div>
        {/* <SkeletonBox className="h-32 w-full mb-8" />  추후에 상황에 따라 지울지 살려둘지 결정*/}
        <SkeletonBox className="h-32 w-full mb-8" />
        <SkeletonBox className="h-40 w-full mb-8" />
        <SkeletonBox className="h-64 w-full" />
      </div>
    </main>
  );
}
