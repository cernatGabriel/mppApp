import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

function Edit() {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const { id } = useParams(); // Get the artist ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch artist details from MongoDB using axios
        axios.get(`http://localhost:3000/artists/${id}`)
            .then(response => {
                const { name, genre } = response.data;
                setName(name);
                setGenre(genre);
            })
            .catch(error => console.error('Error fetching artist details:', error));
    }, [id]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Update artist in MongoDB
        axios.put(`http://localhost:3000/artists/${id}`, { name, genre })
            .then(() => {
                console.log('Artist updated successfully');
                navigate('/');
            })
            .catch(error => console.error('Error updating artist:', error));
    }
    
    return (
        <div style={{ margin: "15rem" }}>
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label className="fw-bold">Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGenre">
                    <Form.Label className="fw-bold">Genre</Form.Label>
                    <Form.Control type="text" placeholder="Enter Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                </Form.Group>
                <Button variant="success" type="submit" onClick={handleSubmit}>
                    Update
                </Button>
            </Form>
        </div>
    );
}

export default Edit;
