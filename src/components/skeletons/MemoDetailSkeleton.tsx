import Window from "../win98/Window";
import { MemoIcon } from "../icons";

export default function MemoDetailSkeleton() {
  return (
    <Window title="Memo Detail" icon={<MemoIcon />} className="h-full">
      <div className="flex flex-col h-full">
        {/* Header skeleton */}
        <div className="win98-sunken p-2 mb-2">
          <div className="flex justify-between items-start mb-1">
            <div className="h-7 mb-2 bg-win98-gray-dark/20 rounded w-1/2 animate-pulse" />
            <div className="h-6 bg-win98-gray-dark/20 rounded w-1/5 animate-pulse" />
          </div>
          <div className="h-5 bg-win98-gray-dark/20 rounded w-1/3 animate-pulse mt-2" />
        </div>

        {/* Content skeleton */}
        <div className="win98-sunken p-2 mb-2 flex-1 overflow-auto min-h-0">
          <div className="space-y-2">
            <div className="h-7 bg-win98-gray-dark/20 rounded w-full animate-pulse" />
            <div className="h-7 bg-win98-gray-dark/20 rounded w-5/6 animate-pulse" />
            <div className="h-7 bg-win98-gray-dark/20 rounded w-4/5 animate-pulse" />
            <div className="h-7 bg-win98-gray-dark/20 rounded w-3/4 animate-pulse" />
          </div>
        </div>

        {/* Reply section skeleton */}
        <div className="pt-2">
          <div className="win98-divider mb-2" />
          <div className="flex justify-between items-center mb-2">
            <div className="font-bold text-lg flex items-center gap-1 opacity-50">
              <span>💬</span> Admin Reply
            </div>
            <div className="win98-raised px-2 py-0.5 text-lg opacity-50">
              Add Reply
            </div>
          </div>
          <div className="win98-sunken p-2 min-h-[120px]">
            <div className="h-7  bg-win98-gray-dark/20 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      </div>
    </Window>
  );
}
