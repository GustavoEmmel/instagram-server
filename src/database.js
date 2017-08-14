import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export default mongoose;

/*
import {db} from '../config';
export default () => {

	mongoose.Promise = global.Promise;
	mongoose.connect(db.URL);

	mongoose.connection.on("connected", () => {
		console.log("Connected to the database");
	});

	mongoose.connection.on("error", (error) => {
		console.log("Connection to database failed: " + error);
	});

	mongoose.connection.on("disconnected", () => {
		console.log("Disconnected from database");
	});

};
*/
