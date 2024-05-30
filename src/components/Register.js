import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function Register() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
       /*
        event.preventDefault();
        try {
            await axios.post('/register', credentials);
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error registering', error);
        }
        */
        navigate(`/`);
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Register</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username" 
                        value={credentials.username} 
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} 
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        value={credentials.password} 
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Register</Button>
            </Form>
        </div>
    );
}

export default Register;
