import React, { useEffect, useState } from 'react';
import './new.css';
import { useNavigate, useLocation } from 'react-router-dom';

const New = ({ inputs }) => {
    const generateRandomId = () => {
        return Math.floor(1000000 + Math.random() * 9000000); // Generates a random 6-digit number
    };

    const [data, setData] = useState({
        name: '',
        email: '',
        id: generateRandomId(), // Initialize employeeId with a random 6-digit number
        phone: '',
    });
    const [isUp, setIsUp] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');

        if (id) {
            const storedRows = JSON.parse(localStorage.getItem('rows')) || [];
            const existingData = storedRows.find(row => String(row.id) === id);

            if (existingData) {
                setData(existingData);
                setIsUp(true)
            } else {
                navigate('/new');
            }
        }
    }, [location, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;

        // Validate email
        if (!/\S+@\S+\.\S+/.test(data.email) && data.email !== "") {
            isValid = false;
            alert("Invalid email address");
        }

        // Validate phone number
        const trimmedPhoneNumber = data.phone.trim();
        if (!/^\d{10}$/.test(trimmedPhoneNumber) && trimmedPhoneNumber !== "") {
            isValid = false;
            alert("Phone number must be 10 digits");
        }

        // If all fields are valid, proceed with submitting the form
        if (isValid) {
            // Update the data in rows in localStorage
            const storedRows = JSON.parse(localStorage.getItem('rows')) || [];
            const updatedRows = storedRows.filter(row => String(row.id) !== String(data.id));
            updatedRows.push(data);
            localStorage.setItem('rows', JSON.stringify(updatedRows));

            // Reset the form
            setData({
                name: '',
                email: '',
                id: generateRandomId(),
                phone: '',
            });

            navigate('/');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;

        if (name === 'phone') {
            processedValue = value.replace(/\s+/g, ''); // Remove all whitespace characters
        }

        setData({ ...data, [name]: processedValue });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100vw' }}>
            <div className="new">
                <div className="newContainer">
                    <div className="top">
                        <h1>Employee Details</h1>
                    </div>
                    <div className="bottom">
                        <div className="right">
                            <form onSubmit={handleSubmit}>
                                {inputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input name={input.name} value={data[input.name]} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                                    </div>
                                ))}
                                <button type='submit' style={{ margin: '20px auto', display: 'block', }}>{isUp ? 'Update' : 'Send'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New;
