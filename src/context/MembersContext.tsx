import React, { createContext, useReducer, useContext } from "react";
import type { ReactNode } from "react";
import type { Member } from "../types/member";

type FiltersData = {
  yearStart: number;
  yearEnd: number;
  word: string[];
  rank: string[];
};

type State = {
  members: Member[];
  membersMap: Record<string, Member>;
  page: number;
  hasMore: boolean;
  activeFilters: FiltersData;
};

type Action =
  | { type: "ADD_MEMBERS"; payload: Member[] }
  | { type: "INCREMENT_PAGE" }
  | { type: "SET_HAS_MORE"; payload: boolean };

const initialState: State = {
  members: [],
  page: 1,
  hasMore: true,
  membersMap: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_MEMBERS": {
      const newMembersMap = { ...state.members };
      action.payload.forEach((m) => {
        newMembersMap[m.id] = m;
      });

      const existingIds = new Set(state.members.map((m) => m.id));
      const uniqueNewMembers = action.payload.filter(
        (m) => !existingIds.has(m.id)
      );

      return {
        ...state,
        members: [...state.members, ...uniqueNewMembers],
      };
    }

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
