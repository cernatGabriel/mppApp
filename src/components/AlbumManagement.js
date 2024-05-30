import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function AlbumManagement() {
    const [albums, setAlbums] = useState([]);
    const [newAlbum, setNewAlbum] = useState({ title: '', releaseYear: '' });
    const { artistId } = useParams();

    useEffect(() => {
        // Fetch albums for the selected artist
        axios.get(`/artists/${artistId}/albums`)
            .then(response => setAlbums(response.data))
            .catch(error => console.error('Error fetching albums:', error));
    }, [artistId]);
    
    const handleDelete = (albumId) => {
        // Delete album
        axios.delete(`/artists/${artistId}/albums/${albumId}`)
            .then(() => {
                // Remove album from state
                setAlbums(albums.filter(album => album._id !== albumId));
            })
            .catch(error => console.error('Error deleting album:', error));
    }

    const handleAddAlbum = () => {
        // Add new album
        axios.post(`/artists/${artistId}/albums`, newAlbum)
            .then(response => {
                // Add new album to state
                setAlbums([...albums, response.data]);
                // Clear form fields
                setNewAlbum({ title: '', releaseYear: '' });
            })
            .catch(error => console.error('Error adding album:', error));
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Albums</h1>
            <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Release Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        albums.map((album) => (
                            <tr key={album._id}>
                                <td>{album.title}</td>
                                <td>{album.releaseYear}</td>
                                <td>
                                    {/* Adjusted Link to include artistId and album._id */}
                                    <Link to={`/artists/${artistId}/albums/${album._id}`} className="btn btn-primary me-2">View</Link>
                                    <Button variant="danger" onClick={() => handleDelete(album._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <div className="mb-3">
                <h2>Add New Album</h2>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" value={newAlbum.title} onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="formReleaseYear">
                        <Form.Label>Release Year</Form.Label>
                        <Form.Control type="text" placeholder="Enter release year" value={newAlbum.releaseYear} onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: e.target.value })} />
                    </Form.Group>
                    <Button variant="success" onClick={handleAddAlbum}>Add Album</Button>
                </Form>
            </div>
        </div>
    );
}

export default AlbumManagement;
