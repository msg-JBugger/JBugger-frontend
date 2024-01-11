import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Comment } from '../../Models/Comment';
import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from 'jwt-decode';
import axios from 'axios';

interface AddCommentProps {
    bugId: number;
    onChange: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ bugId, onChange }) => {
    const [username, setUsername] = useState<string>(''); // State to store the username

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const jwt = localStorage.getItem('jwt');
                if (jwt) {
                    const decodedToken = jwtDecode(jwt) as JwtPayload;
                    setUsername(decodedToken.sub!);
                }
            } catch (error) {
                console.error('Error fetching jwt username:', error);
            }
        };

        fetchUsername();
    }, []); // Empty dependency array to run the effect only once when the component mounts

    const [comment, setComment] = useState<Comment>({
        commentId: -1,
        bug: bugId,
        username: username,
        date: new Date(),
        text: '',
    });

    const onSubmit = async () => {
        let error = '';
        if (comment.text.length === 0) {
            error = 'Message is required.';
        }

        if (error !== '') {
            console.log(error);
            return;
        }

        try {
            
            const jwt = localStorage.getItem('jwt');

        try {

            const response =  await axios.post(
                import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + 'api/comments/add',
                {
                    text: comment.text,
                    username: comment.username,
                    bugId: comment.bug,
                    date: comment.date,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + jwt,
                    },
                }
            );
            console.log(response);
            setComment({
                commentId: -1,
                bug: bugId,
                username: localStorage.getItem('username')!,
                date: new Date(),
                text: '',
            });
            onChange();   
        }
        catch (error) {
            console.log(error);
        }
            

        } catch (err) {
            console.log(err);
            alert(err);
        }
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment({ ...comment, text: e.target.value });
    };

    return (
        <Form className="mt-4 p-4 border rounded shadow-sm">
            <Form.Group controlId="commentTextarea">
                <Form.Label>Add a Comment</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Type your comment here..."
                    style={{ resize: 'none' }}
                    value={comment.text}
                    onChange={handleCommentChange}
                />
            </Form.Group>
            <Button variant="primary" className="mt-2" onClick={onSubmit}>
                Add Comment
            </Button>
        </Form>
    );
}

export default AddComment;