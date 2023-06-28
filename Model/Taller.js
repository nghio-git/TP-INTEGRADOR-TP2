import { DataTypes as DT, Model } from "sequelize";
import connection from "../Connection/connection.js";
import bcrypt from "bcrypt";

class Taller extends Model {
  async validatePassword(passwordEnTextoPlano) {
    const hash = await bcrypt.hash(passwordEnTextoPlano, this.salt);
    return hash === this.password;
  }
}

Taller.init(
  {
    nombre: {
      type: DT.STRING,
      allowNull: false,
      validate: {
        len: [5, 30],
      },
    },
    telefono: {
      type: DT.STRING(15),
      allowNull: false,
      validate: {
        is: /^[0-9]/,
      },
    },
    direccion: {
        type: DT.STRING(),
        allowNull: false,
        // validate: {
        //     is: /^[A-Za-z]\s^[0-9]/,
        // },
    },
    email: {
      type: DT.STRING(),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
        type: DT.STRING(),
        allowNull: false,
      },
    tipo: {
        type: DT.ENUM(`GENERAL`, `DIAGNOSTICO`, `PINTURA`, `REPUESTO`),
        allowNull: false,
    },
    estaDisponible: {
        type: DT.BOOLEAN(),
        allowNull: false,
        defaultValue: false,
    },
    salt: {
      type: DT.STRING(),
    },
    roleId: {
      type: DT.INTEGER(),
      defaultValue: 3,
    },
  },
  {
    sequelize: connection,
    modelName: "Taller",
    timestamps: false,
  }
);

Taller.beforeCreate(async (taller) => {
  const salt = await bcrypt.genSalt();
  taller.salt = salt;

  const passwordHash = await bcrypt.hash(taller.password, salt);
  taller.password = passwordHash;
});

export default Taller;