import { useState, useEffect } from "react";
import useAxiosRequest from "../services/useAxios";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import "./SinglePage.css";

const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
          <h2>{data.name}</h2>
          <p>{data.role}</p>
          <p>{data.department}</p>
          <p>{data.location}</p>
          <p> {data.startDate}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Button text="Back" role="primary-bg" onClick={() => navigate(-1)} />
    </div>
  );
};

export default SinglePage;
