import { Role } from "../Model/index.js";

const roleSeed = async () => {
  try {
    const result = await Role.findAll()
    if (result.length == 0){
      Role.bulkCreate([
        {
          id: 1,
          role: "admin",
        },
        {
          id: 2,
          role: "user",
        },
        {
          id: 3,
          role: "taller"
        },
      ]);
    }

  } catch (error) {
    console.log(error.message);
  }
};

export default roleSeed;
