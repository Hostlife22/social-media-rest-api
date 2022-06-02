const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
const express_1 = __importDefault(require('express'));
const helmet_1 = __importDefault(require('helmet'));
const mongoose_1 = __importDefault(require('mongoose'));
const morgan_1 = __importDefault(require('morgan'));
const auth_route_1 = __importDefault(require('./routes/auth.route'));
const conversation_route_1 = __importDefault(
  require('./routes/conversation.route')
);
const file_route_1 = __importDefault(require('./routes/file.route'));
const message_route_1 = __importDefault(require('./routes/message.route'));
const post_route_1 = __importDefault(require('./routes/post.route'));
const users_route_1 = __importDefault(require('./routes/users.route'));

dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
mongoose_1.default.connect(process.env.MONGO_URL, () => {
  console.log('Connected to MongoDb');
});
app.use('/images', express_1.default.static('public/images'));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('common'));
app.use('/api/upload', file_route_1.default);
app.use('/api/users', users_route_1.default);
app.use('/api/auth', auth_route_1.default);
app.use('/api/posts', post_route_1.default);
app.use('/api/conversations', conversation_route_1.default);
app.use('/api/messages', message_route_1.default);
app.listen(PORT, () => {
  console.log(`App listening on d the port ${PORT}`);
});
