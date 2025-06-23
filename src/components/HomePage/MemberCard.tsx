import type { Member } from "../../types/member";
import { Link } from "react-router-dom";
import unknownPerson from "../../assets/unknownPerson.jpg";

interface MemberCardProps {
  member: Member;
  firstInRow?: boolean;
}

export default function MemberCard({
  member,
  firstInRow = false,
}: MemberCardProps) {
  const baseSizeClass = firstInRow
    ? "w-[20rem] sm:w-[24rem] md:w-[27rem] h-[28rem] sm:h-[32rem] md:h-[36rem]"
    : "w-[9rem] sm:w-[11rem] md:w-[13rem] h-[12rem] sm:h-[14rem] md:h-[17.5rem]";

  const titleClass = firstInRow
    ? "text-xl sm:text-2xl md:text-3xl px-4 sm:px-6 pb-4 sm:pb-6"
    : "text-sm sm:text-base px-2 sm:px-3 pb-2 sm:pb-3";

  return (
    <Link to={`/hero/${member.id}`} className="block">
      <div
        className={`bg-cover bg-center flex flex-col justify-end overflow-hidden cursor-pointer ${baseSizeClass}`}
        style={{
          backgroundImage: member.image
            ? `url(${member.image})`
            : `url(${unknownPerson})`,
        }}
      >
        <h2 className={`italic font-semibold text-white ${titleClass}`}>
          {member.name}
        </h2>
      </div>
    </Link>
  );
}
