import { schema } from "normalizr";
import base from "./base";
import userSchema from "./user";
export default new schema.Entity(
  "todos",
  {
    list: new schema.Entity("lists", { owner: userSchema }, base),
    owner: userSchema
  },
  base
);
