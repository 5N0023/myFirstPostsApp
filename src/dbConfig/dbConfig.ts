import mongoose from 'mongoose';

const uri = "mongodb+srv://dbUser:dbUserPassword@cluster0.nlkd3d0.mongodb.net/?retryWrites=true&w=majority"
export async function connect() {
    try {
        mongoose.connect(uri,{});
        const connection = mongoose.connection;
        connection.on('open', () => {
            console.log('Database connected');
        });
        connection.on('error', (err: any) => {
            console.log('Error', err);
        }
        );

    } catch (error) {
        console.log(error);
    }
}

export async function disconnect() {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
    }
}