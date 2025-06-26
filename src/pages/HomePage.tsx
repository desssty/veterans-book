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
  const [filtersActive, setFiltersActive] = useState(false);
  const [filters, setFilters] = useState(null);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(false);

  const filtersAreActive = isFiltersActive(state.activeFilters);

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
  }, [activeFilters, dispatch]);

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

  function clearFilters() {
    dispatch({
      type: "SET_FILTERS",
      payload: {
        rank: [],
        word: [],
        yearStart: NaN,
        yearEnd: NaN,
      },
    });
    dispatch({ type: "RESET_PAGE_AND_MEMBERS" });
  }

  function isFiltersActive(filters: FiltersData) {
    const { rank, word, yearStart, yearEnd } = filters;
    return (
      (rank && rank.length > 0) ||
      (word && word.length > 0) ||
      (!isNaN(yearStart) && !isNaN(yearEnd))
    );
  }

  return (
    <>
      <Helmet>
        <title>Стена Памяти</title>
      </Helmet>
      <MemberPanel
        filterActive={filtersActive}
        setFilterActive={setFiltersActive}
        clearFilters={clearFilters}
        filtersAreActive={filtersAreActive}
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
