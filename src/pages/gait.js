import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './gait.css';
import { Button, ThemeProvider } from '@mui/material';
import theme from '../theme/theme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { modelStyle } from '../theme/style';
import Chart from 'react-apexcharts'




function Gait() {
    const [data, setData] = useState()

    const [aceX,setAceX] = useState([])
    const [aceY,setAceY] = useState([])

    const [force1,setForce1] = useState([])
    const [force2,setForce2] = useState([])

    const[gyroX,setGyroX] = useState([])
    const[gyroY,setGyroY] = useState([])

    const[temp,setTemp] = useState([])


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
                setAceX(data=>[...data,res.data.acceleration['aclr-x']])
                setAceY(data=>[...data,res.data.acceleration['aclr-y']])

                setForce1(data=>[...data,res.data.forcesensor.fs1])
                setForce2(data=>[...data,res.data.forcesensor.fs2])

                setGyroX(data=>[...data,res.data.gyro['gyro-x']])
                setGyroY(data=>[...data,res.data.gyro['gyro-y']])

                setTemp(data=>[...data,res.data.temperature.temp])


                
               
                console.log(res.data.acceleration['aclr-y'])
            });
        }, 1000);
        return () => clearInterval(interval);

    }, [])
    console.log(temp)
    const handleClick = (data) => {
        setActiveMenue(data)
    }



    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const chartOptions =  {
        options: {
          chart: {
            id: 'apexchart-example'
          },
          xaxis: {
           
          }
        },
        series: [
            {
          name: 'series-1',
          data: []
        },
        {
            name: 'series-2',
            data: []
          }
    ]
      }
      if (activeMenue === 'Acceleration') {
        chartOptions.options.xaxis.categories = aceX.slice(Math.max(aceX.length - 10, 0));
        chartOptions.series[0].data = aceY.slice(Math.max(aceY.length - 10, 0));
        chartOptions.series[0].name = 'Acceleration'
      }
      else if (activeMenue === 'Force') {
        chartOptions.series[0].data = force1.slice(Math.max(force1.length - 10, 0));
        chartOptions.series[1].data = force2.slice(Math.max(force2.length - 10, 0));

        chartOptions.series[0].name = 'Force-1'
        chartOptions.series[1].name = 'Force-2'

      }
      else if (activeMenue === 'Gyro') {
        chartOptions.options.xaxis.categories = gyroX.slice(Math.max(gyroX.length - 10, 0));
        chartOptions.series[0].data = gyroY.slice(Math.max(gyroY.length - 10, 0));
        chartOptions.series[0].name = 'Gyro'
      }
      else if (activeMenue === 'Tempreature') {
     
        chartOptions.series[0].data = temp.slice(Math.max(temp.length - 10, 0));
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

                <ThemeProvider theme={theme} >
                    <p class="card-footer"><Button variant="contained" size="small" sx={{ m: 1 }} onClick={handleOpen}>Graph</Button></p>
                </ThemeProvider>
                
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modelStyle}>

                    <Chart type='line'
                            width={500}
                            height={320}
                            options={chartOptions.options} series={chartOptions.series}
                        />

                        
                    </Box>
                </Modal>

            </div>
        </div>
    )
}

export default Gait