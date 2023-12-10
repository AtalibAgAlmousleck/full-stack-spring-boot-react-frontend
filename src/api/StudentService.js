import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/students";

export async function saveStudent(student) {
    return await axios.post(API_URL, student);
}

export async function getStudents(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size${size}`);
}

export async function getStudent(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function updateStudent(student) {
    return await axios.post(API_URL, student);
}

export async function updatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteStudent(id) {
    return await axios.delete(`${API_URL}/${id}`);
}