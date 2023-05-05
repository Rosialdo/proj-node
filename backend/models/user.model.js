const user = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "User",
    {
      nome: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      pasoword: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "user",
    }
  );
  return user;
};



export default user;
