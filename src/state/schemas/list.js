import { schema } from "normalizr";
import base from "./base";
import userSchema from "./user";
import todoSchema from "./todo";
export default new schema.Entity("lists", { owner: userSchema, todos: [todoSchema] }, base);
