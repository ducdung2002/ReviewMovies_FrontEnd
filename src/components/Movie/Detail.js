import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import "./Detail.css";
import axios from "axios";
const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9999/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const openTrailerInNewTab = () => {
    if (movie.trailerURL) {
      window.open(movie.trailerURL, "_blank");
    } else {
      console.error("Trailer URL is not available");
    }
  };

  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      console.error("Vui lòng chọn số sao để đánh giá.");
      return;
    }

    // Gửi đánh giá lên server
    axios
      .post(`http://localhost:9999/movies/${id}/rate`, { stars: rating })
      .then((response) => {
        console.log("Rating saved successfully");
        axios
          .get(`http://localhost:9999/movies/${id}`)
          .then((response) => {
            setMovie(response.data);
          })
          .catch((error) => {
            console.error("Error fetching movie after rating:", error);
          });
      })
      .catch((error) => {
        console.error("Error saving rating:", error);
      });
  };

  const calculateAverageRating = () => {
    if (movie.ratings && movie.ratings.length > 0) {
      const totalStars = movie.ratings.reduce(
        (acc, curr) => acc + curr.stars,
        0
      );
      const averageRating = totalStars / movie.ratings.length;
      return averageRating.toFixed(1); 
    }
    return 0; 
  };
  return (
    <Container>
      <Row>
        <Col sm={3}>
          <Image src={movie.image} className="img-thumbnail imgDetail" alt="" />
        </Col>
        <Col sm={9}>
          <div className="detailMovie">
            <h2>{movie.name}</h2>
            <div className="container mt-4">
              <p>
                <strong>Thể loại:</strong>{" "}
                {movie.categories && movie.categories.length > 0
                  ? movie.categories.map((category) => category.type).join(", ")
                  : "Loading..."}
              </p>
              <p>
                <strong>Điểm đánh giá:</strong>{" "}
                <span className="star-filled">★</span>{" "}
                {calculateAverageRating()}
              </p>
              <p>
                <strong>Mô tả:</strong> {movie.description}
              </p>
              <p>
                <Button variant="info" onClick={openTrailerInNewTab}>
                  Xem Trailer
                </Button>
              </p>
              <hr />
              <h3>Chi tiết đánh giá:</h3>
              <Form>
                <Row className="mb-3 align-items-center">
                  <Form.Group as={Col} sm="2">
                    <Form.Label>
                      <strong>Điểm đánh giá:</strong>
                    </Form.Label>
                  </Form.Group>
                  <Col sm={4} lg={4}>
                    <div className="star-rating">
                      {[...Array(10)].map((_, index) => (
                        <span
                          key={index}
                          className={
                            index < rating ? "star-filled" : "star-empty"
                          }
                          onClick={() => handleStarClick(index + 1)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </Col>
                  <Col sm={6} lg={6}>
                    <Button variant="info" onClick={handleSubmitRating}>
                      Gửi đánh giá
                    </Button>
                  </Col>
                </Row>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    <strong>Bình luận:</strong>
                  </Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button variant="info">Đăng</Button>
              </Form>

              <hr />
              <h3>Bình luận</h3>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
