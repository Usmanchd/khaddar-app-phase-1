const express = require('express');
const connectDB = require('./config/db');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');
app = express();

//mongodb connect
connectDB();

const server = http.createServer(app);

const io = socketIo(server);

//Init Middleware
app.use(express.json({ extended: false }));

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

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
