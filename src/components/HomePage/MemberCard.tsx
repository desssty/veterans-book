import type { Member } from "../../types/member";
import { Link } from "react-router-dom";
import unknownPerson from "../../assets/unknownPerson.jpg";

type MemberCardProps = {
  member: Member;
  firstInRow?: boolean;
};

export default function MemberCard({
  member,
  firstInRow = false,
}: MemberCardProps) {
  const cardSizeClass = firstInRow
    ? "w-[20rem] sm:w-[24rem] md:w-[26.75rem] h-[28rem] sm:h-[32rem] md:h-[35.69rem]"
    : "w-[9rem] sm:w-[11rem] md:w-[13rem] h-[12rem] sm:h-[14rem] md:h-[17.31rem]";

  const titleClass = firstInRow
    ? "text-[1.75rem] px-6 pb-6"
    : "text-base px-3 pb-3";

  return (
    <Link to={`/hero/id:${member.id}`} className="block">
      <div
        className={`rounded cursor-pointer flex flex-col justify-end overflow-hidden ${cardSizeClass}`}
        style={{
          backgroundImage: member.image ? undefined : `url(${unknownPerson})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className={`italic font-semibold text-white ${titleClass}`}>
          {member.name}
        </h2>
      </div>
    </Link>
  );
}
