### chat-room-backend

### ensure your node version is 16 or higher

### `yarn install` to install dependencies

### `yarn start:dev` to run with --watch

# added swagger for better development experience

# added output dto so the client-side developer can see details about API

# added join endpoint for user to save avatar and username

# avatar is saved static in server in-memory

# for saving all messages in-memory without database I created an array to keep in-memory

# added error handling to receive not empty avatar and username from client

# crated gateway for socket integrating

# added leave event to send to the client for leaving the room

# (maybe client opened the same account with 5 tabs in the same browser if one of them is closed all should be closed real-time)

# added typing event for sending to the client who is typing at the moment
