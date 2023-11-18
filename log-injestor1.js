const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();
const port = 3000;

// Enable CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());

const logs = [];

app.post('/ingest', (req, res) => {
    const logEntry = req.body;
    //Convert timestamp to Date object 
    logEntry.timestamp = new Date(logEntry.timestamp); 
    logs.push(logEntry);
    
    res.status(200).send('Log ingested successfully');
});

// filtering
app.post('/query', (req, res) => {
    const { level, message, resourceId, startTimestamp, endTimestamp, traceId, spanId, commit, parentResourceId } = req.body;
    // Adjust timestamp
    const adjustTimestamp = (timestamp) => moment(timestamp).add(5, 'hours').add(30, 'minutes').toISOString(); 

    const adjustedStartTimestamp = startTimestamp ? adjustTimestamp(startTimestamp) : null;
    const adjustedEndTimestamp = endTimestamp ? adjustTimestamp(endTimestamp) : null;
    console.log(new Date(adjustedStartTimestamp));
    

    const filteredLogs = logs.filter(log =>
        (!level || log.level === level) &&
        (!message || log.message.includes(message)) &&
        (!resourceId || log.resourceId === resourceId) &&
        (!startTimestamp || log.timestamp >= new Date(adjustedStartTimestamp)) &&
        (!endTimestamp || log.timestamp <= new Date(adjustedEndTimestamp)) &&
        (!traceId || log.traceId === traceId) &&
        (!spanId || log.spanId === spanId) &&
        (!commit || log.commit === commit) &&
        (!parentResourceId || (log.metadata && log.metadata.parentResourceId === parentResourceId))
    );

    // Set response headers
    res.setHeader('Content-Type', 'application/json');

    // Send the filtered logs as JSON response
    res.json(filteredLogs);
});


app.listen(port, () => {
    console.log(`Log ingestor server listening at http://localhost:${port}`);
});
