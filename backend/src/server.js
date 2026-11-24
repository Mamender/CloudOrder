import app from './app.js';
import { config } from './config/index.js';
const server = app.listen(config.port, () => {
    console.log(`Server running in ${config.nodeEnv} mode on http://localhost:${config.port}`);
    console.log(`Product data path: ${config.dataPath}`);
});
export default server;
//# sourceMappingURL=server.js.map