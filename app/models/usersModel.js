import bcrypt from "bcryptjs";
import Blog from './blogs'
module.exports = (sequelize, type) => { 

   
    const User =  sequelize.define('user', 
        { 
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: type.STRING,
            email: {
                type:type.STRING
            },
            password:{
                type:type.STRING,
            },
           
        },
        { 
            hooks:{
                beforeCreate(user, options) { 
                    console.log(user.password);
                    return bcrypt.hash(user.password, 10)
                        .then(hash => {
                            user.password = hash;
                            this.password = hash;
                        })
                        .catch(err => { 
                             throw new Error(); 
                        });
                }
            }
        });

     User.associate = function(models) { 
            // associations can be defined here
            //User.hasMany(models);
            User.hasMany(models.Blog,{
                foreignKey:'userId'
            });
            //User.hasMany(models.Task);
     };
    
    User.prototype.isValidPassword = async function (newPassword) {
        try { 
            
            return await bcrypt.compare(newPassword,this.password);
        }catch(error) {
              throw new Error(error);  
        }
      }

    return User;  
}