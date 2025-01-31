import React, { useEffect, useState } from 'react';
import './styles/PageHome.css';
import { io } from 'socket.io-client';
import User from '../utils/User';
import axios from 'axios';

const socket = io('http://localhost:4000');

const FileSharingPage = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [name, setName] = useState('');
    let me;
    const [devices, setDevices] = useState(
        Array.from({ length: 35 }, (_, index) => ({
            id: index + 1,
            name: `Device ${index + 1}`,
        }))
    );

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleRemoveFile = (fileIndex) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileIndex));
    };

    const handleDeviceClick = (deviceId) => {
        if (selectedFiles.length === 0) {
            // If no files are selected, open the file dialog
            document.getElementById('file-input').click();
            socket.emit('receiverSelected', deviceId);
        } else {
            // If files are already selected, show an alert
            alert(`Files are ready to be sent to Device ${deviceId}.`);
            socket.emit('receiverSelected', deviceId);
            // Implement WebRTC file transfer logic here
        }
    };

    const getListAndRegister = async (address)=>{
        await axios.get('http://localhost:4000/getUsers',{
            params:{
                address: me.address
            }
        }).then(function (res){
            if(res.data == "") setDevices([]);
            else setDevices(res.data);
            console.log(res.data);
        }).catch(function (err){
            console.log(err);
        });

        setName(me.name);
        
    }

    useEffect(() => {
        me = new User('xyz', '', '23.312');
        getListAndRegister(me.address);
        socket.emit("register", me);
        return () => {
            socket.disconnect(me.address);
        };
    }, []);

    return (
        <div className="file-sharing-page">
            <div className="left-column">
                {/* Display the client's name */}
                <div className="client-name">
                    <h2>Welcome, {name}!</h2>
                </div>
                <h1>Local Network File Sharing</h1>
                <div className="devices-list">
                    <h2>Devices</h2>
                    <ul>
                        {devices.map((device) => (
                            <li key={device.id} onClick={() => handleDeviceClick(device.id)}>
                                {device.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="right-column">
                <div className="file-selection">
                    <input
                        id="file-input"
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleFileSelect}
                    />
                    <button onClick={() => document.getElementById('file-input').click()}>
                        Select Files
                    </button>
                    <div className="selected-files-notifications">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="file-notification">
                                <span>{file.name}</span>
                                <button onClick={() => handleRemoveFile(index)}>×</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileSharingPage;