import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import MembersScroll from "../components/HomePage/MembersScroll";
import MemberPanel from "../components/HomePage/MemberPanel";
import Filters from "../components/HomePage/Filters";
import { useMembers } from "../context/MembersContext";

export default function HomePage() {
  const { state, dispatch } = useMembers();
  const { members, page, hasMore } = state;
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [filtersActive, setFiltersActive] = useState(false);
  const [filters, setFilters] = useState(null);
  const [filtersLoading, setFiltersLoading] = useState(false);

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

  useEffect(() => {
    if (filtersActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersActive]);

  useEffect(() => {
    async function fetchFilters() {
      setFiltersLoading(true);
      try {
        const filtersResponse = await axios.get(
          "https://book-memory-sections-out.itlabs.top/api/members/filters/get"
        );
        setFilters(filtersResponse.data);
      } catch (error) {
        console.error("Ошибка при загрузке фильтров:", error);
      } finally {
        setFiltersLoading(false);
      }
    }

    if (filtersActive && !filters) {
      fetchFilters();
    }
  }, [filtersActive, filters]);

  return (
    <>
      <Helmet>
        <title>Стена Памяти</title>
      </Helmet>
      <MemberPanel
        filterActive={filtersActive}
        setFilterActive={setFiltersActive}
      />
      <MembersScroll
        members={members}
        hasMore={hasMore}
        loaderRef={loaderRef}
      />
      {filtersActive && (
        <Filters
          filters={filters}
          loading={filtersLoading}
          onClose={() => setFiltersActive(false)}
        />
      )}
    </>
  );
}
