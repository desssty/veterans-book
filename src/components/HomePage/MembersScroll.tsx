import MemberCard from "./MemberCard";
import type { Member } from "../../types/member";
import Loading from "../common/Loading";

interface MembersScrollProps {
  members: Member[];
  hasMore: boolean;
  loaderRef: React.RefObject<HTMLDivElement | null>;
}

export default function MembersScroll({
  members,
  hasMore,
  loaderRef,
}: MembersScrollProps) {
  return (
    <div className="relative w-full">
      <div className="overflow-x-auto">
        <div
          className="flex gap-y-4 gap-x-3 px-[5rem] w-max"
          style={{ scrollbarWidth: "thin" }}
        >
          {members[0] && <MemberCard member={members[0]} firstInRow={true} />}

          <div
            className="grid grid-rows-2 gap-y-4 gap-x-3 auto-cols-max"
            style={{ gridAutoFlow: "column" }}
          >
            {members.slice(1).map((member) => (
              <MemberCard key={member.id} member={member} firstInRow={false} />
            ))}
          </div>

          {hasMore && <Loading text={"Загружаю"} ref={loaderRef} />}
        </div>
      </div>

      <div className="absolute left-0 top-0 h-full w-[5rem] pointer-events-none bg-gradient-to-r from-[#E4D4B8] to-transparent z-10" />

      <div className="absolute right-0 top-0 h-full w-[5rem] pointer-events-none bg-gradient-to-l from-[#E4D4B8] to-transparent z-10" />
    </div>
  );
}
