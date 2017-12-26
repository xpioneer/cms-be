/*xpioneer*/

import mysql from 'mysql';
import config from './db.config';


const pool = mysql.createPool({
	connectionLimit : 10,
	host            : config.HOST,
	user            : config.USER,
	password        : config.PASSWORD,
	database        : config.DATABASE
});


const query = (sql, values) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if(err) {
				reject(err)
			} else {
				console.log('sql', sql, 'values', values);
				// Use the connection 
				let _query = connection.query(sql, values ? values : [], (error, results, fields) => {
				// And done with the connection. 
				connection.release();

				// Handle error after the release. 
				if (error) {
					reject(error)
				} else {
					resolve(results)
				}

				// Don't use the connection here, it has been returned to the pool. 
				});

				console.log('query.sql', _query.sql)
			}
		});
	});
};

export default {
	query
};