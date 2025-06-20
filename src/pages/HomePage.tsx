import { useEffect, useState, useRef } from "react";
import axios from "axios";
import type { Member } from "../types/member";
import MembersScroll from "../components/HomePage/MembersScroll";
import MemberPanel from "../components/HomePage/MemberPanel";

export default function HomePage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `https://book-memory-sections-out.itlabs.top/api/members?page=${page}&itemsPerPage=13`
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
        rootMargin: "400px",
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
    <>
      <MemberPanel />
      <MembersScroll
        members={members}
        hasMore={hasMore}
        loaderRef={loaderRef}
      />
    </>
  );
}
