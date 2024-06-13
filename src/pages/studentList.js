import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

// const API_URL = "http://localhost:5000";
const API_URL = "http://192.168.49.2:30415"

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editingStudent, setEditingStudent] = useState([]);
    const [newStudent, setNewStudent] = useState({
        name: '',
        age: 0,
        email: '',
        phoneNumber: '',
        gender: '',
        school: '',
        nation: '',
    });
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchStudents();
    }, []);
    const fetchStudents = async () => {
        try {
            const response = await axios.get(API_URL + '/all');
            setStudents(response.data);
        } catch (error) {
            console.log('Error fetching students:', error);
        }
    };
    const handleDetailClick = (student) => {
        setSelectedStudent(student);
    };
    const handleDeleteClick = async (student) => {
        try {
            await axios.delete(API_URL + '/delete/&id=' + student._id);
            fetchStudents();
        } catch (error) {
            console.log('Error deleting student:', error);
        }
    };
    const handleEditClick = (student) => {
        setEditingStudent(student);
        setOpenEditDialog(true);
    };
    const handleSaveEdit = async () => {
        try {
            await axios.put(`${API_URL}/update/&id=${editingStudent._id}`, editingStudent);
            fetchStudents();
            handleCloseEditDialog();
        } catch (error) {
            console.log('Error updating student:', error);
        }
    };
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditingStudent(editingStudent);
    };
    // add
    const handleAddClick = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        setNewStudent({
            name: '',
            age: 1,
            email: '',
            phoneNumber: '',
            gender: '',
            school: '',
            nation: '',
        });
    };
    const handleAddStudent = async () => {
        try {
            await axios.post(API_URL + '/add', newStudent);
            fetchStudents();
            handleCloseAddDialog();
        } catch (error) {
            console.log('Error adding student:', error);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };
    return (
        <Box mt={10}>
            <Typography variant="h4" gutterBottom align='center'>
                Danh sách sinh viên VDT 2024
            </Typography>
            <TableContainer component={Paper}>
                <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', align: 'center', width: '180px' }}>Tên</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', align: 'center', width: '120px' }}>Giới tính</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', align: 'center', width: '280px' }}>Trường học</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', align: 'center', width: '300px' }}>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <TableRow key={student._id}>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell >{student.gender}</TableCell>
                                        <TableCell>{student.school}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="primary" onClick={() => handleDetailClick(student)} sx={{ marginRight: '8px' }}>
                                                Chi tiết
                                            </Button>
                                            <Button variant="outlined" color="primary" onClick={() => handleEditClick(student)} sx={{ marginRight: '8px' }}>
                                                Sửa
                                            </Button>
                                            <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(student)} sx={{ backgroundColor: 'red', color: 'black' }}>
                                                Xóa
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <Typography variant="body1">Không có sinh viên.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Button variant="contained" color="primary" onClick={handleAddClick} sx={{ backgroundColor: 'orange', color: 'white' }}>
                                        Thêm sinh viên
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog} >
                <DialogTitle style={{ textAlign: 'center' }}>Thêm sinh viên</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column">
                        <TextField
                            label="Tên"
                            name="name"
                            value={newStudent.name}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            label="Tuổi"
                            name="age"
                            value={newStudent.age}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={newStudent.email}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            label="Số điện thoại"
                            name="phoneNumber"
                            value={newStudent.phoneNumber}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <FormControl margin="normal">
                            <InputLabel>Giới tính</InputLabel>
                            <Select
                                name="gender"
                                value={newStudent.gender}
                                onChange={handleChange}
                            >
                                <MenuItem value="Nam">Nam</MenuItem>
                                <MenuItem value="Nữ">Nữ</MenuItem>
                                <MenuItem value="Khác">Khác</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Trường học"
                            name="school"
                            value={newStudent.school}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            label="Quốc gia"
                            name="nation"
                            value={newStudent.nation}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleAddStudent} color="primary">
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
            {selectedStudent && (
                <Box mt={4} className="DetailsBox" sx={{ padding: '16px' }}>
                    <Typography variant="h5" gutterBottom>
                        Thông tin chi tiết sinh viên
                    </Typography>
                    <Typography>
                        Tên: {selectedStudent.name}
                    </Typography>
                    <Typography>
                        Tuổi: {selectedStudent.age}
                    </Typography>
                    <Typography>
                        Email: {selectedStudent.email}
                    </Typography>
                    <Typography>
                        Số điện thoại: {selectedStudent.phoneNumber}
                    </Typography>
                    <Typography>
                        Giới tính: {selectedStudent.gender}
                    </Typography>
                    <Typography>
                        Trường học: {selectedStudent.school}
                    </Typography>
                    <Typography>
                        Quốc gia: {selectedStudent.nation}
                    </Typography>
                </Box>
            )}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle style={{ textAlign: 'center' }}>Chỉnh sửa sinh viên</DialogTitle>
                <DialogContent>
                    {editingStudent && (
                        <Box display="flex" flexDirection="column">
                            <TextField
                                label="Tên"
                                name="name"
                                value={editingStudent.name}
                                onChange={handleEditChange}
                                margin="normal"
                            />
                            <TextField
                                label="Tuổi"
                                name="age"
                                value={editingStudent.age}
                                onChange={handleEditChange}
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                value={editingStudent.email}
                                onChange={handleEditChange}
                                margin="normal"
                            />
                            <TextField
                                label="Số điện thoại"
                                name="phoneNumber"
                                value={editingStudent.phoneNumber}
                                onChange={handleEditChange}
                                margin="normal"
                            />
                            <FormControl margin="normal">
                                <InputLabel>Giới tính</InputLabel>
                                <Select
                                    name="gender"
                                    value={editingStudent.gender}
                                    onChange={handleEditChange}
                                >
                                    <MenuItem value="Nam">Nam</MenuItem>
                                    <MenuItem value="Nữ">Nữ</MenuItem>
                                    <MenuItem value="Khác">Khác</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Trường học"
                                name="school"
                                value={editingStudent.school}
                                onChange={handleEditChange}
                                margin="normal"
                            />
                            <TextField
                                label="Quốc gia"
                                name="nation"
                                value={editingStudent.nation}
                                onChange={handleEditChange}
                                margin="normal"
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleSaveEdit} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
            
        </Box>
        
    );
};

export default StudentList;