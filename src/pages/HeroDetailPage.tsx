import { Helmet } from "react-helmet";
import { useMembers } from "../context/MembersContext";

export default function HeroDetailPage() {
  const { state, dispatch } = useMembers();
  const { hasMore } = state;

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
      <div>HERO</div>
      <button onClick={handleNext}>Следующий</button>
    </>
  );
}
