import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './gait.css';

function Gait() {
    const [data, setData] = useState()
    const [activeMenue, setActiveMenue] = useState('Acceleration')
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('This will run every second!');
            axios({
                method: 'get',
                url: 'https://shoe-53fb4-default-rtdb.firebaseio.com/gait.json',

            }).then(res => {
                console.log(res.data)
                setData(res.data)
            });
        }, 1000);
        return () => clearInterval(interval);

    }, [])

    const handleClick = (data) => {
        setActiveMenue(data)
    }

    return (
        <div>

            <div class="card">
                <ul class="nav-links">
                    <li><a className={activeMenue == 'Acceleration' ? 'active' : ''} onClick={() => handleClick('Acceleration')}>Acceleration</a></li>
                    <li ><a className={activeMenue == 'Force' ? 'active' : ''} onClick={() => handleClick('Force')}>Force</a></li>
                    <li ><a className={activeMenue == 'Gyro' ? 'active' : ''} onClick={() => handleClick('Gyro')} >Gyro</a></li>
                    <li ><a className={activeMenue == 'Tempreature' ? 'active' : ''} onClick={() => handleClick('Tempreature')} >Tempreature</a></li>
                </ul>
                <div style={{ marginLeft: '40px' }}>
                    {
                        activeMenue == 'Acceleration' && <div >
                            <p>Acceleration X: <strong>{data && data.acceleration['aclr-x']}</strong></p>
                            <p>Acceleration Y: <strong>{data && data.acceleration['aclr-y']}</strong></p>
                            <p>Acceleration Z: <strong>{data && data.acceleration['aclr-z']}</strong></p>
                        </div>
                        
                    }
                </div>
                <div style={{ marginLeft: '40px' }}>
                    {
                        activeMenue == 'Force' && <div >
                            <p>Force 1: <strong>{data && data.forcesensor.fs1}</strong></p>
                            <p>Force 2: <strong>{data && data.forcesensor.fs2}</strong></p>
                        </div>
                    }
                </div>
                <div style={{ marginLeft: '40px' }}>
                    {
                        activeMenue == 'Gyro' && <div >
                            <p>Gyro X: <strong>{data && data.gyro['gyro-x']}</strong></p>
                            <p>Gyro Y: <strong>{data && data.gyro['gyro-y']}</strong></p>
                            <p>Gyro Z: <strong>{data && data.gyro['gyro-z']}</strong></p>
                        </div>
                    }
                </div>
                <div style={{ marginLeft: '40px' }}>
                    {
                        activeMenue == 'Tempreature' && <div >
                            <p>Tempreature: <strong>{data && data.temperature.temp}</strong></p>
                           
                        </div>
                    }
                </div>


                <p class="card-footer"></p>
            </div>
        </div>
    )
}

export default Gait