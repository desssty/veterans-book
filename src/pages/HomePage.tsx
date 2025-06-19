import { useEffect, useState, useRef } from "react";
import axios from "axios";

interface Member {
  id: number;
  name: string;
  yearStartAt: number;
  yearEndAt: number;
  medal: boolean;
  image: string | null;
  next: number;
  monthDeath: string;
  city: string;
  calledUponDate: string;
  howDie: string;
  placeDeath: string | null;
  ranks: string | null;
}

export default function HomePage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `https://book-memory-sections-out.itlabs.top/api/members?page=${page}&itemsPerPage=14`
        );

        const data: Member[] = response.data;
        console.log(data);
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setMembers((prev) => [...prev, ...data]);
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    };

    fetchMembers();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: "200px",
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white shadow p-6 rounded text-black"
            style={{ minHeight: "300px" }}
          >
            <h2 className="text-xl font-semibold mb-4">{member.name}</h2>

            <div className="mb-2">
              <span className="font-semibold italic text-red-700">
                Год рождения:{" "}
              </span>
              <span>{member.yearStartAt || "?"} г.</span>
            </div>

            <div className="mb-2">
              <span className="font-semibold italic text-red-700">
                Место рождения:{" "}
              </span>
              <span>{member.city || "?"}</span>
            </div>

            <div className="mb-2">
              <span className="font-semibold italic text-red-700">
                Звание:{" "}
              </span>
              <span>{member.ranks || "?"}</span>
            </div>

            <div className="mb-2">
              <span className="font-semibold italic text-red-700">
                Призван в армию:{" "}
              </span>
              <span>{member.calledUponDate || "?"}</span>
            </div>

            <div className="mb-2">
              <span className="font-semibold italic text-red-700">
                Как погиб:{" "}
              </span>
              <span>{member.howDie || "?"}</span>
            </div>

            <div className="mb-2">
              <span className="font-semibold italic text-red-700">
                Место гибели (захоронение):{" "}
              </span>
              <span>{member.placeDeath || "?"}</span>
            </div>

            <div className="mb-2">
              <span className="font-semibold italic text-red-700">
                Дата гибели:{" "}
              </span>
              <span>
                {(member.monthDeath || "?") + " " + (member.yearEndAt || "?")}{" "}
                г.
              </span>
            </div>

            {member.image && (
              <img
                src={member.image}
                alt={member.name}
                className="mt-4 rounded w-full h-auto object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="h-10 flex justify-center items-center">
          <p className="text-gray-500">Загружаю...</p>
        </div>
      )}
    </div>
  );
}
