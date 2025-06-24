import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useMembers } from "../context/MembersContext";
import PanelButton from "../components/common/PanelButton";
import medalIcon from "../assets/medalIcon.svg";
import unknownPerson from "../assets/unknownPerson.jpg";

export default function HeroDetailPage() {
  const { state, dispatch } = useMembers();
  const { hasMore } = state;
  const navigate = useNavigate();

  const { id } = useParams();

  const member = id
    ? state.members.find((m) => String(m.id) === String(id))
    : null;

  const btnSizeNotMember = { width: "36rem", height: "4.3125rem" };

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-500 text-5xl">Герой не найден</p>
        <div className="mt-[6rem]">
          <PanelButton
            type="link"
            href="/search"
            label="К ПОИСКУ"
            active={false}
            {...btnSizeNotMember}
          />
        </div>
      </div>
    );
  }

  const handleNext = async () => {
    if (!id) return;

    const currentIndex = state.members.findIndex(
      (m) => String(m.id) === String(id)
    );
    const nextMember = state.members[currentIndex + 1];

    if (nextMember) {
      navigate(`/hero/${nextMember.id}`);
    } else {
      const nextId = Number(id) + 1;

      try {
        const response = await axios.get(
          `https://book-memory-sections-out.itlabs.top/api/members/${nextId}`
        );
        const fetchedMember = response.data;

        if (fetchedMember && fetchedMember.id) {
          dispatch({ type: "ADD_MEMBERS", payload: [fetchedMember] });
          navigate(`/hero/${fetchedMember.id}`);
        } else {
          console.log("Следующий участник не найден");
        }
      } catch (error) {
        console.error("Ошибка при загрузке следующего участника:", error);
      }
    }
  };

  const btnSize = { width: "428px", height: "69px" };

  const currentIndex = state.members.findIndex(
    (m) => String(m.id) === String(id)
  );
  const nextMember = state.members[currentIndex + 1];

  const isNextAvailable = Boolean(nextMember) || hasMore;

  return (
    <>
      <Helmet>
        <title>Герой</title>
      </Helmet>
      <div className="w-full px-[5rem]">
        <div className="flex flex-row border-t border-t-[#8B8785] pt-[46px] justify-between gap-0">
          <div className="flex flex-col gap-[111px]">
            <div className="flex flex-col gap-[2.5rem]">
              <h1 className="text-5xl text-[#2B2A29] font-bold">
                {member.name || "?"}
              </h1>
              <div className="flex flex-col text-[#792426] ">
                <div className="flex flex-row gap-[72px]">
                  <div>
                    <p className="text-[2rem]  italic font-semibold">
                      Год рождения
                    </p>
                    <p className="text-[#2B2A29] text-[1.5rem]">
                      {member.yearStartAt || "?"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[2rem]  italic font-semibold">
                      Место рождения
                    </p>
                    <p className="text-[#2B2A29] text-[1.5rem]">
                      {member.city || "?"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-[72px]">
                  <div>
                    <p className="text-[2rem]  italic font-semibold">Звание</p>
                    <p className="text-[#2B2A29] text-[1.5rem]">
                      {member.ranks || "?"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[2rem]  italic font-semibold">
                      Призван в армию
                    </p>
                    <p className="text-[#2B2A29] text-[1.5rem]">
                      {member.calledUponDate || "?"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[2rem] italic font-semibold">
                      Как погиб
                    </p>
                    <p className="text-[#2B2A29] text-[1.5rem]">
                      {member.howDie || "?"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-[72px]">
                  <div>
                    <p className="text-[2rem]  italic font-semibold">
                      Место гибели (захоронение)
                    </p>
                    <p className="text-[#2B2A29] text-[1.5rem]">
                      {member.placeDeath || "?"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[2rem]  *:italic font-semibold">
                      Дата гибели
                    </p>
                    <p className="text-[#2B2A29] text-[1.5rem]">
                      {member.monthDeath || "?"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[1rem]">
              <div className="flex flex-row gap-[1rem]">
                <PanelButton
                  type="link"
                  href="/"
                  label="НА ГЛАВНУЮ"
                  active={false}
                  {...btnSize}
                />
                <PanelButton
                  type="button"
                  icon={medalIcon}
                  label="CЛЕДУЮЩИЙ ГЕРОЙ"
                  active={isNextAvailable}
                  onClick={handleNext}
                  {...btnSize}
                />
              </div>
              <p className="text-[#2B2A29]">
                Для стены памяти информация получена от родных, близких и друзей
                героев
              </p>
            </div>
          </div>
          <div>
            <img
              src={member.image || unknownPerson}
              alt={member.name}
              className="w-[428px] h-[571px] object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
