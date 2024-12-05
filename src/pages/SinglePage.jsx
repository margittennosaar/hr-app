import { useState, useEffect } from "react";
import useAxiosRequest from "../services/useAxios";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import "./SinglePage.css";

const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState();

  const { data, loading, error, read } = useAxiosRequest(
    `http://localhost:3001/persons/${id}`
  );

  useEffect(() => {
    read();
  }, []);

  return (
    <div>
      {data ? (
        <div className="singlePage-content">
          <h2>{details.name}</h2>
          <p>{details.role}</p>
          <p>{details.department}</p>
          <p>{details.location}</p>
          <p> {details.startDate}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Button text="Back" role="primary-bg" onClick={() => navigate(-1)} />
    </div>
  );
};

export default SinglePage;
