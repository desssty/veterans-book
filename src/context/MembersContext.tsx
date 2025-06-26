import React, { createContext, useReducer, useContext } from "react";
import type { ReactNode } from "react";
import type { Member } from "../types/member";
import type { FiltersData } from "../types/filters";

type State = {
  members: Member[];
  page: number;
  hasMore: boolean;
  activeFilters: FiltersData;
};

type Action =
  | { type: "ADD_MEMBERS"; payload: Member[] }
  | { type: "SET_MEMBERS"; payload: Member[] }
  | { type: "INCREMENT_PAGE" }
  | { type: "SET_HAS_MORE"; payload: boolean }
  | { type: "SET_FILTERS"; payload: FiltersData }
  | { type: "RESET_PAGE_AND_MEMBERS" };

const initialState: State = {
  members: [],
  page: 1,
  hasMore: true,
  activeFilters: {
    rank: [],
    word: [],
    yearStart: 0,
    yearEnd: 1946,
    name: "",
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_MEMBERS": {
      const existingIds = new Set(state.members.map((m) => m.id));
      const uniqueNewMembers = action.payload.filter(
        (m) => !existingIds.has(m.id)
      );
      return {
        ...state,
        members: [...state.members, ...uniqueNewMembers],
      };
    }

    case "SET_MEMBERS":
      return {
        ...state,
        members: action.payload,
      };

    case "INCREMENT_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };

    case "SET_HAS_MORE":
      return {
        ...state,
        hasMore: action.payload,
      };

    case "SET_FILTERS":
      return {
        ...state,
        activeFilters: action.payload,
      };

    case "RESET_PAGE_AND_MEMBERS":
      return {
        ...state,
        page: 1,
        members: [],
        hasMore: true,
      };

    default:
      return state;
  }
}

const MembersContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function MembersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MembersContext.Provider value={{ state, dispatch }}>
      {children}
    </MembersContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMembers() {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error(
      "useMembers должен использоваться только с MembersProvider"
    );
  }
  return context;
}
