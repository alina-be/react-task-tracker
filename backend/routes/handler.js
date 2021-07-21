const express = require('express')
const router = express.Router()

router.get('/tasks', (rep, res) => {
    const str = [    {
        "id": 3,
        "text": "Doctors Appointment 3",
        "day": "Feb 5th at 2pm",
        "reminder": true
    },
        {
            "id": 4,
            "text": "Uni 2",
            "day": "Feb 6th at 1:30pm",
            "reminder": false
        }]
    res.end(JSON.stringify(str))
})

router.post('/addTask', (rep, res) => {
    res.end('NA')
})

module.exports = router