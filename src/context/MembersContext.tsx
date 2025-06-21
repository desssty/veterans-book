import React, { createContext, useReducer, useContext } from "react";
import type { ReactNode } from "react";
import type { Member } from "../types/member";

type State = {
  members: Member[];
  page: number;
  hasMore: boolean;
};

type Action =
  | { type: "ADD_MEMBERS"; payload: Member[] }
  | { type: "INCREMENT_PAGE" }
  | { type: "SET_HAS_MORE"; payload: boolean }
  | { type: "RESET" };

const initialState: State = {
  members: [],
  page: 1,
  hasMore: true,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_MEMBERS":
      return {
        ...state,
        members: [...state.members, ...action.payload],
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
    case "RESET":
      return initialState;
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

export function useMembers() {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error("useMembers must be used within MembersProvider");
  }
  return context;
}
