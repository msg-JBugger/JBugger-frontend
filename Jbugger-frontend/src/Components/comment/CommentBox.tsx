import React from 'react';
import { Comment } from '../../Models/Comment';


interface CommentBoxProps {
    comment: Comment;
}

const formatDateForDisplay = (dateString: string) => {
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    };

    const formattedDate = new Date(dateString).toLocaleString('en-GB', options);
    return formattedDate;
};

const CommentBox: React.FC<CommentBoxProps> = ({ comment }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{comment.user['username']}</h5>
                </div>
                <p className="card-text">{comment.text}</p>
                <p className="card-text">
                    <small className="text-muted">{formatDateForDisplay(comment.date)}</small>
                </p>
            </div>
        </div>
    );
};

export default CommentBox;
