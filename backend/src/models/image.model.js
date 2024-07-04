
import connectDB from "../databases/connect.js";

export default new class ImageModel {

    async getImage(limit, skip) { 
        try {
            const [results] = await connectDB.query(
                'SELECT * FROM image ORDER BY created_at DESC LIMIT ? OFFSET ?;', 
                [limit, skip]
            );
            return results;
        } catch (err) {
            let { sql, ...err_modifier } = err;
            return err_modifier;
        }
    }

    async uploadImage(image_url, image_name, image_desc) {
        try { 
            const [result] = await connectDB.query(
                'INSERT INTO image (path, name, description) VALUES (?, ?, ?)', 
                [image_url, image_name, image_desc]
            );
            return result ? result.insertId : 0;
        } catch (err) {
            let { sql, ...err_modifier } = err;
            throw err_modifier;
        }
    }
}
