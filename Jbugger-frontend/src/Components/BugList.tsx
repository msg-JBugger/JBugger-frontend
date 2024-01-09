import React from 'react';
import { Bug } from '../Models/Bug';
import { Link } from 'react-router-dom';

interface BugListProps {
  bugs: Bug[] | undefined;
}

const BugList: React.FC<BugListProps> = ({ bugs }) => {
  const tableRows: JSX.Element[] = [];

  if(bugs != null) {
    Object.values(bugs).forEach((bug, index) => {
      tableRows.push(
        <tr key={index}>
          <td>{index + 1}</td>
          
          <td>{bug.title}</td>
          <td>{bug.description}</td>
          <td>{bug.version}</td>
          <td>{bug.fixedRevision}</td>
          <td>{bug.targetDate.toString()}</td>
          <td>{bug.status}</td>
          <td>{bug.severity}</td>
          <td>{bug.reporterUsername}</td>
          <td>{bug.assigneeUsername}</td>
          <td>
            <Link to={`/bug-details/${bug.bugId}`}>{'See details'}</Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Nr. Crt</th>
              <th>Title</th>
              <th>Description</th>
              <th>Version</th>
              <th>FIV</th>
              <th>Target Date</th>
              <th>Status</th>
              <th>Severity</th>
              <th>Created By</th>
              <th>Assigned To</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BugList;
