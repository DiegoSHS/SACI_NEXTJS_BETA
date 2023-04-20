import { DataTypes } from "sequelize"

export const mysqlTask = (sequelize) => {
    const task = sequelize.define('tasks', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        timestamps: true,
        freezeTableName: true,
    })
    return task
}