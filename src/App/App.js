import React from 'react';
import { Container } from '@mui/material';
import StudentList from '../pages/studentList';
import './App.css';
function App() {
  return (
    <>
      <Container maxWidth="md">
        <StudentList />
      </Container>
    </>
  );
};

export default App;
