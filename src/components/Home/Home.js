import {
  Carousel,
  Row,
  Col,
  Card,
  Button,
  Container,
  Form,
  Dropdown,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import axios from "axios";
function Home() {
  const nav = useNavigate();
  const [categories, setCategory] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9999/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:9999/categories")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleSearch = () => {
    axios
      .get(`http://localhost:9999/movies/search?name=${searchTerm}`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  const handleCategoryClick = (categoryId) => {
    if (categoryId === null) {
      // Nếu click All
      axios
        .get(`http://localhost:9999/movies`)
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.error("Error fetching all movies:", error);
        });
    } else {
      // Nếu click category cụ thể
      axios
        .get(`http://localhost:9999/categories/${categoryId}/movies`)
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.error("Error fetching movies by category:", error);
        });
    }

    setSelectedCategoryId(categoryId);
  };

  const handleSortChange = (sortOrder) => {
    let sortedMovies;
    if (sortOrder === "newest") {
      sortedMovies = [...movies].sort(
        (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
      );
    } else if (sortOrder === "oldest") {
      sortedMovies = [...movies].sort(
        (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
      );
    } else {
      sortedMovies = [...movies];
    }
    setMovies(sortedMovies);
  };

  const Movies = ({ movies }) => {
    return (
      <div className="movies">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {movies.map((m, index) => (
            <Col key={index}>
              <Card>
                <Card.Img
                  variant="top"
                  src={m.image}
                  className="img-thumbnail"
                  alt={m.name}
                />
                <Card.Body>
                  <Card.Title className="text-truncate h5">{m.name}</Card.Title>
                  <Card.Text>Ngày phát hành: {m.releaseDate}</Card.Text>
                  <Card.Text>
                    Thể loại:{" "}
                    {m.categories.map((category) => category.type).join(", ")}
                  </Card.Text>
                  <Card.Text>
                    {" "}
                    Điểm: <span className="star-filled">★</span> {m.rating}
                  </Card.Text>
                  <Button
                    variant="info"
                    className="mt-2"
                    onClick={() => nav(`/detail/${m._id}`)}
                  >
                    Xem đánh giá
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://img.freepik.com/premium-vector/color-cinema-pattern-with-camera-tickets-popcorn_124800-1046.jpg?w=2000"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://img.freepik.com/vetores-premium/teste-padrao-colorido-dos-icones-do-cinema-sem-emenda-icone-de-colecao-de-sinais-e-simbolos-para-sites_71374-11.jpg?w=2000"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>

      <Container className="showMovies mt-4">
        <Row>
          <Col lg={2} sm={3}>
            <div className="categorys">
              <div className="categoryTitle">Categories</div>
              <div
                className={`category ${
                  selectedCategoryId === null ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(null)}
              >
                All
              </div>
              {categories.map((category) => (
                <div
                  className={`category ${
                    selectedCategoryId === category._id ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(category._id)}
                  key={category._id}
                >
                  {category.type}
                </div>
              ))}
            </div>
          </Col>
          <Col lg={10} sm={9}>
            <Container>
              <Row>
                <Col md={3} className="p-0">
                  <Form.Control
                    type="text"
                    placeholder="Enter name to search"
                    className=" mr-sm-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
                <Col md={1}>
                  <Button variant="secondary" onClick={handleSearch}>
                    Find
                  </Button>
                </Col>
                <Col md={2} className="p-0">
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Sắp xếp
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleSortChange("newest")}>
                        Sắp xếp theo năm +
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSortChange("oldest")}>
                        Sắp xếp theo năm -
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Movies movies={movies} />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
