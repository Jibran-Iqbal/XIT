import React, { useEffect, useState } from 'react';
import './TablePage.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const TablePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState([
    {
      id: 1143155,
      name: "John Smith",
      email: "john@example.com",
      phone: "1234567890",
    },
    {
      id: 2235235,
      name: "Michael Doe",
      email: "michael@example.com",
      phone: "4567890123",
    },
    {
      id: 2342353,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "7890123456",
    },
    {
      id: 2357741,
      name: "Harold Carol",
      email: "harold@example.com",
      phone: "0123456789",
    },
    {
      id: 2342355,
      name: "Alice Carol",
      email: "alice@example.com",
      phone: "3456789012",
    },
  ]);

  useEffect(() => {
    // Check if rows exist in localStorage
    const storedRows = localStorage.getItem('rows');
    if (storedRows) {
      // If rows exist, set them in state
      setRows(JSON.parse(storedRows));
    } else {
      // If not, set the initial rows in localStorage
      localStorage.setItem('rows', JSON.stringify(rows));
    }
  }, [location]);

  const handleDelete = (id) => {
    // Remove the row with the given id from the rows in state and localStorage
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
    localStorage.setItem('rows', JSON.stringify(updatedRows));
  };

  const handleEdit = (id) => {
    navigate(`/new?id=${id}`);
  };

  return (
    <>
      <div className="" style={{ margin:'10px 0',display: 'flex', justifyContent: 'flex-start', flexDirection:"row-reverse" ,width:'100%' }}>
        <Button size="small" onClick={() => navigate('/new')} variant='contained' style={{ marginRight: '10px' }} color="primary">Add Row</Button>
      </div>

      <div className="center">
        <TableContainer component={Paper} elevation={5} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Employee ID</TableCell>
                <TableCell className="tableCell">Name</TableCell>
                <TableCell className="tableCell">Email</TableCell>
                <TableCell className="tableCell">Phone Number</TableCell>
                <TableCell className="tableCell">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="tableCell">{row.id}</TableCell>
                  <TableCell className="tableCell">{row.name}</TableCell>
                  <TableCell className="tableCell">{row.email}</TableCell>
                  <TableCell className="tableCell">{row.phone}</TableCell>
                  <TableCell className="tableCell">
                    <Button size="small" variant='outlined' style={{ marginRight: '10px' }} color="info" onClick={() => handleEdit(row.id)}>Edit</Button>
                    <Button size="small" variant='outlined' color='error' onClick={() => handleDelete(row.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default TablePage;
