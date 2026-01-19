import Window from "../win98/Window";
import { ListIcon } from "../icons";

function SkeletonItem() {
  return (
    <li className="px-2 py-1.5 flex items-center gap-2 border-b border-win98-gray">
      <span className="text-xs opacity-50">📝</span>
      <div className="flex-1 min-w-0">
        <div className="h-3 bg-win98-gray-dark/20 rounded w-3/4 mb-1 animate-pulse" />
        <div className="h-2 bg-win98-gray-dark/20 rounded w-1/2 animate-pulse" />
      </div>
    </li>
  );
}

export default function MemosListSkeleton() {
  return (
    <Window title="Memo List" icon={<ListIcon />} className="h-full">
      <div className="flex flex-col h-full">
        {/* Toolbar skeleton */}
        <div className="flex gap-2 mb-2">
          <div className="win98-raised px-3 py-1 text-xs opacity-50">
            New Memo
          </div>
          <div className="win98-raised px-3 py-1 text-xs opacity-50">
            Refresh
          </div>
        </div>

        {/* List skeleton */}
        <div className="win98-sunken flex-1 overflow-auto min-h-0">
          <ul>
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
          </ul>
        </div>
      </div>
    </Window>
  );
}
