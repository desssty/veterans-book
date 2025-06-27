import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import MembersScroll from "../components/HomePage/MembersScroll";
import MemberPanel from "../components/HomePage/MemberPanel";
import Filters from "../components/HomePage/Filters";
import { useMembers } from "../context/MembersContext";
import type { FiltersData } from "../types/filters";

export default function HomePage() {
  const { state, dispatch } = useMembers();
  const { members, page, hasMore, activeFilters } = state;
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersData | null>(null);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const filtersAreActive = isFiltersActive(state.activeFilters, filters);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    async function fetchMembers() {
      setLoadingMembers(true);
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("itemsPerPage", "13");

        if (activeFilters.yearStart && !isNaN(activeFilters.yearStart)) {
          params.append("yearStart", activeFilters.yearStart.toString());
        }
        if (activeFilters.yearEnd && !isNaN(activeFilters.yearEnd)) {
          params.append("yearEnd", activeFilters.yearEnd.toString());
        }
        if (activeFilters.rank.length > 0) {
          params.append("ranks", activeFilters.rank.join(","));
        }
        if (activeFilters.word.length > 0) {
          params.append("word", activeFilters.word.join(","));
        }

        if (activeFilters.name && activeFilters.name.trim() !== "") {
          params.append("name", activeFilters.name.trim());
        }

        const response = await axios.get(
          `https://book-memory-sections-out.itlabs.top/api/members?${params.toString()}`
        );

        const data = response.data;
        if (data.length === 0) {
          dispatch({ type: "SET_HAS_MORE", payload: false });
        } else {
          if (page === 1) {
            dispatch({ type: "SET_MEMBERS", payload: data });
          } else {
            dispatch({ type: "ADD_MEMBERS", payload: data });
          }
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        setLoadingMembers(false);
      }
    }

    fetchMembers();
  }, [page, activeFilters, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loadingMembers) {
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
  }, [hasMore, dispatch, loadingMembers]);

  useEffect(() => {
    dispatch({ type: "RESET_PAGE_AND_MEMBERS" });

    console.log(activeFilters);
  }, [activeFilters, dispatch]);

  useEffect(() => {
    if (filtersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

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

    if (filtersOpen && !filters) {
      fetchFilters();
    }
  }, [filtersOpen, filters]);

  function clearFilters() {
    dispatch({
      type: "SET_FILTERS",
      payload: {
        rank: [],
        word: [],
        yearStart: 0,
        yearEnd: 1946,
        name: "",
      },
    });

    dispatch({ type: "RESET_PAGE_AND_MEMBERS" });
  }

  useEffect(() => {
    if (filters) {
      const safeFilters = filters as FiltersData;
      dispatch({
        type: "SET_FILTERS",
        payload: {
          rank: [],
          word: [],
          yearStart: safeFilters.yearStart,
          yearEnd: safeFilters.yearEnd,
          name: "",
        },
      });
    }
  }, [filters, dispatch]);

  function isFiltersActive(
    filtersData: FiltersData,
    filters: FiltersData | null
  ) {
    const defaultYearStart = filters?.yearStart ?? 0;
    const defaultYearEnd = filters?.yearEnd ?? 1946;
    const { rank, word, yearStart, yearEnd } = filtersData;
    return (
      (rank && rank.length > 0) ||
      (word && word.length > 0) ||
      yearStart !== defaultYearStart ||
      yearEnd !== defaultYearEnd
    );
  }

  useEffect(() => {
    const scrollEl = scrollContainerRef.current;
    if (!scrollEl) return;

    function handleScroll() {
      if (!scrollEl) return;
      setScrollPosition(scrollEl.scrollLeft);
      setMaxScroll(scrollEl.scrollWidth - scrollEl.clientWidth);
    }

    scrollEl.addEventListener("scroll", handleScroll);

    setMaxScroll(scrollEl.scrollWidth - scrollEl.clientWidth);

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const scrollEl = scrollContainerRef.current;
    if (!scrollEl) return;

    setMaxScroll(scrollEl.scrollWidth - scrollEl.clientWidth);
  }, [members.length]);

  function handleScrollChange(value: number) {
    setScrollPosition(value);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = value;
    }
  }

  return (
    <>
      <Helmet>
        <title>Стена Памяти</title>
      </Helmet>
      <MemberPanel
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        clearFilters={clearFilters}
        filtersAreActive={filtersAreActive}
        onScrollChange={handleScrollChange}
        scrollPosition={scrollPosition}
        maxScroll={maxScroll}
      />

      <MembersScroll
        members={members}
        hasMore={hasMore}
        loaderRef={loaderRef}
        scrollContainerRef={scrollContainerRef}
      />

      {filtersOpen && (
        <Filters
          filters={filters}
          loading={filtersLoading}
          onClose={() => setFiltersOpen(false)}
        />
      )}
    </>
  );
}
