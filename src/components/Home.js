import React, { useState, useEffect } from 'react';
import { Button, Table, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import PieChart from './PieChart';
import axios from 'axios'; // Import axios for making HTTP requests

function Home() {
    const [artists, setArtists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentArtists = artists.slice(indexOfFirstItem, indexOfLastItem);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch artists from MongoDB using axios
        axios.get('http://localhost:3000/artists')
            .then(response => setArtists(response.data))
            .catch(error => console.error('Error fetching artists:', error));
    }, []);
    
    const handleDelete = (id) => {
        // Delete artist from MongoDB
        axios.delete(`/artists/${id}`)
            .then(() => {
                // Refresh artist list after deletion
                axios.get('/artists')
                    .then(response => setArtists(response.data))
                    .catch(error => console.error('Error fetching artists:', error));
            })
            .catch(error => console.error('Error deleting artist:', error));
    }

    const handleViewAlbums = (artistId) => {
        navigate(`/albums/${artistId}`);
    }

    const currentItems = currentArtists;
    return (
        <div className="container mt-4">
        <h1 className="mb-4">Music Artists</h1>
        <Table striped bordered hover size='sm'>
            <thead>
                <tr>
                    <th className="bg-success text-white">Name</th>
                    <th className="bg-success text-white">Genre</th>
                    <th className="bg-success text-white">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    currentItems.map((artist) => (
                        <tr key={artist._id}>
                            <td>{artist.name}</td>
                            <td>{artist.genre}</td>
                            <td>
                                <Link to={`/edit/${artist._id}`}>
                                    <Button variant="warning" className="me-2">Edit</Button>
                                </Link>
                                <Button variant="danger" onClick={() => handleDelete(artist._id)}>DELETE</Button>
                                <Button variant="primary" onClick={() => handleViewAlbums(artist._id)}>View Albums</Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            </Table>
            <Pagination>
                <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(Math.ceil(artists.length / itemsPerPage)).keys()].map((number) => (
                    <Pagination.Item key={number + 1} onClick={() => setCurrentPage(number + 1)} active={number + 1 === currentPage}>
                        {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(artists.length / itemsPerPage)} />
            </Pagination>
            <div className="d-flex align-items-center mt-3">
                <Link className='btn btn-success' to="/create">
                    Create
                </Link>
            </div>
            <PieChart />
        </div>
    );
}

export default Home;
