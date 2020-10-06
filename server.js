const express = require('express');
const connectDB = require('./config/db');
const socketIo = require('socket.io');
const http = require('http');
const { worker } = require('cluster');
app = express();

//mongodb connect
connectDB();

const server = http.createServer(app);

const io = socketIo(server);

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('welcome');
});

io.on('connection', (socket) => {
  socket.on('new_order', (order) => {
    io.emit('new_order_placed', order);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use('/api/user', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/category', require('./routes/category'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/products'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
