"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_controller_1 = require("./controller/post.controller");
const user_controller_1 = require("./controller/user.controller");
const session_controller_1 = require("./controller/session.controller");
const middleware_1 = require("./middleware");
const user_schema_1 = require("./schema/user.schema");
const post_schema_1 = require("./schema/post.schema");
function default_1(app) {
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    // Register user
    app.post("/api/users", (0, middleware_1.validateRequest)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    // Login
    app.post("/api/sessions", (0, middleware_1.validateRequest)(user_schema_1.createUserSessionSchema), session_controller_1.createUserSessionHandler);
    // Get the user's sessions
    app.get("/api/sessions", middleware_1.requiresUser, session_controller_1.getUserSessionsHandler);
    // Logout
    app.delete("/api/sessions", middleware_1.requiresUser, session_controller_1.invalidateUserSessionHandler);
    // Create a post
    app.post("/api/posts", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.createPostSchema)], post_controller_1.createPostHandler);
    // Update a post
    app.put("/api/posts/:postId", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.updatePostSchema)], post_controller_1.updatePostHandler);
    // Get a post
    app.get("/api/posts/:postId", post_controller_1.getPostHandler);
    // Delete a post
    app.delete("/api/posts/:postId", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.deletePostSchema)], post_controller_1.deletePostHandler);
}
exports.default = default_1;
