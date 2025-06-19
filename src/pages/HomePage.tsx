import { useEffect, useState, useRef } from "react";
import axios from "axios";
import MemberCard from "../components/HomePage/MemberCard";
import type { Member } from "../types/member";

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
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore]);

  return (
    <div className="relative w-full">
      <div className="overflow-x-auto">
        <div
          className="flex gap-y-4 gap-x-3 mt-4 px-[5rem] w-max"
          style={{ scrollbarWidth: "thin" }}
        >
          {/* Первая большая карточка */}
          {members[0] && <MemberCard member={members[0]} firstInRow={true} />}

          {/* Контейнер с маленькими карточками в две строки */}
          <div
            className="grid grid-rows-2 gap-y-4 gap-x-3 auto-cols-max"
            style={{ gridAutoFlow: "column" }}
          >
            {members.slice(1).map((member) => (
              <MemberCard key={member.id} member={member} firstInRow={false} />
            ))}
          </div>

          {/* Лоадер — в самом конце скролла */}
          {hasMore && (
            <div
              ref={loaderRef}
              className="min-w-[5rem] h-full flex items-center justify-center"
            >
              <p className="text-gray-500 text-sm">Загружаю...</p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute left-0 top-0 h-full w-[5rem] pointer-events-none bg-gradient-to-r from-[#E4D4B8] to-transparent z-10" />

      <div className="absolute right-0 top-0 h-full w-[5rem] pointer-events-none bg-gradient-to-l from-[#E4D4B8] to-transparent z-10" />
    </div>
  );
}
