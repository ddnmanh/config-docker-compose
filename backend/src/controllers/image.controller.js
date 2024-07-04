
import { ImageModel } from "../models/index.model.js";
import UploadFile from "../middleware/upload-file.middleware.js";

export default new class ImageController {

    async getImage(req, res) {
        try {
            const items = parseInt(req.query.items) || 10;
            const page = parseInt(req.query.page) || 1;
            const skip = (page - 1) * items; // Number of items to skip

            const images = await ImageModel.getImage(items, skip);

            return res.status(200).json({ error: false, message: 'Image retrieved successfully', data: images });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async uploadImage(req, res) {
        try {
            const Upload = new UploadFile('image_file', 1, ['upload/image']); 
            const { path_file_saved, form_data } = await Upload.upload(req, res); 

            console.log(path_file_saved, form_data);

            if (!path_file_saved || !form_data.name || !form_data.description) {
                return res.status(400).json({ error: true, message: 'Missing attributes', data: { success: false } });
            } else {
                const insert_id = await ImageModel.uploadImage(path_file_saved[0], form_data.name, form_data.description);

                return res.status(200).json({ error: false, message: 'Image uploaded successfully', data: { success: insert_id != 0 } });
            }
        } catch (error) {
            return res.status(500).json({ error: true, message: error.message, data: { success: false }  });
        }
    }
};
