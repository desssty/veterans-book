import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import MembersScroll from "../components/HomePage/MembersScroll";
import MemberPanel from "../components/HomePage/MemberPanel";
import { useMembers } from "../context/MembersContext";

export default function HomePage() {
  const { state, dispatch } = useMembers();
  const { members, page, hasMore } = state;
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get(
          `https://book-memory-sections-out.itlabs.top/api/members?page=${page}&itemsPerPage=13`
        );

        const data = response.data;
        if (data.length === 0) {
          dispatch({ type: "SET_HAS_MORE", payload: false });
        } else {
          dispatch({ type: "ADD_MEMBERS", payload: data });
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    }

    fetchMembers();
  }, [page, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          dispatch({ type: "INCREMENT_PAGE" });
        }
      },
      {
        root: null,
        rootMargin: "400px",
        threshold: 0.1,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, dispatch]);

  return (
    <>
      <Helmet>
        <title>Стена Памяти</title>
      </Helmet>
      <MemberPanel />
      <MembersScroll
        members={members}
        hasMore={hasMore}
        loaderRef={loaderRef}
      />
    </>
  );
}
