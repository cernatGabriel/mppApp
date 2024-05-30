import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Add() {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/artists', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, genre })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            navigate('/');
        })
        .catch(error => console.error('Error adding artist:', error));
    }
    

    return (
        <div style={{ margin: "15rem" }}>
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label className="fw-bold">Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" required onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGenre">
                    <Form.Label className="fw-bold">Genre</Form.Label>
                    <Form.Control type="text" placeholder="Enter Genre" required onChange={(e) => setGenre(e.target.value)} />
                </Form.Group>
                <Button variant="success" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Add;
