import React from 'react';
import CommentBox from './CommentBox';
import { Comment } from '../../Models/Comment';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <Card className="mt-4 shadow">
        <Card.Body>
          <Card.Text>No comments available.</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <ListGroup className="mt-4">
      {comments.map(comment => (
        <ListGroup.Item key={comment.commentId} className="shadow">
          <CommentBox comment={comment} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CommentList;
