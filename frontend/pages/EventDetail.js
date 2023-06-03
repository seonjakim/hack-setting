import { useParams } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();

  return <div>EventDetail{id}</div>;
};

export default EventDetail;
