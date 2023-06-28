import Role from "./Role.js";
import User from "./User.js";
import Taller from "./Taller.js"

Role.hasMany(User, {
  foreignKey: "roleId",
});
User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});
Role.hasMany(Taller, {
  foreignKey: "roleId",
});
Taller.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
})
Taller.hasMany(User, {
  foreignKey: "tallerAsig"
})
User.belongsTo(Taller, {
  foreignKey: "tallerAsig",
  as: "taller"
})

export { User, Role, Taller };
