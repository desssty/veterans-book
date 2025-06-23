import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useMembers } from "../context/MembersContext";

export default function HeroDetailPage() {
  const { state, dispatch } = useMembers();
  const { hasMore } = state;

  const { id } = useParams();

  const member = id ? state.membersMap[id] : null;

  if (!member) {
    return <div>Участник не найден</div>;
  }

  const handleNext = () => {
    if (hasMore) {
      dispatch({ type: "INCREMENT_PAGE" });
    } else {
      console.log("Дальше данных нет");
    }
  };
  return (
    <>
      <Helmet>
        <title>Герой</title>
      </Helmet>
      <h1>{member.name}</h1>
      <button onClick={handleNext}>Следующий</button>
    </>
  );
}
