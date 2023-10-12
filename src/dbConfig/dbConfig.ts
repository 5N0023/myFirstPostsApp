import mongoose from 'mongoose';

let uri:any = process.env.MONGODB_URI
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