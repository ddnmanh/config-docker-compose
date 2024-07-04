
import ImageRouter from './image.route.js';

export default function routes(app) {
    app.use('/api', ImageRouter);

    app.use('/api/status-server', (req, res) => {
        res.status(200).send('Server is running at port: '+process.env.EXPRESS_APP_PORT)
    });
}