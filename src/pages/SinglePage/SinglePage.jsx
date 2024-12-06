import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosRequest from "../../services/useAxios";
import Button from "../../components/Button/Button";
import styles from "./SinglePage.module.css";

const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, read } = useAxiosRequest(
    `http://localhost:3001/persons/${id}`
  );

  useEffect(() => {
    read();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {data && (
        <div className={styles.singlePageContent}>
          <h2>{data.name}</h2>
          <p>{data.role}</p>
          <p>{data.department}</p>
          <p>{data.location}</p>
          <p> {data.startDate}</p>
        </div>
      )}
      <Button text="Back" role="primary-light" onClick={() => navigate(-1)} />
    </div>
  );
};

export default SinglePage;
