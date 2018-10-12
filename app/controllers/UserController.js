import JWT from 'jsonwebtoken';
import { User , Blog ,Task } from '../../sequelize';
import { JWT_SECRET } from '../../config';
import bcrypt from "bcryptjs";


/**
 * Signing token for jwt 
 * @param {*} user 
 * @return Sign jWT Token
 */

function signTOken(user) { 
    
    return JWT.sign({
        iss: 'nodeapi',
        sub:  user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() +1)   
    },JWT_SECRET);

}

/**
 * Create Async function for Bcrypt password
 * Its Taking 3-4  m . Secs to create
 * So need to create in async
 * @param {*} password 
 */

async function passwordHash(password){
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        return hash;

    }catch(error){
      throw new Error(error);
    }
}

module.exports = { 

    signUp: async (req, res, next) => {   
        
        // Use Await for password Hash Because its return value after some time.
        //{name: req.body.name, email: req.body.email, password: await passwordHash(req.body.password)}

        User.create(req.body).then(user => {
                res.json({ token: signTOken(user)
            })    
        }).catch(error => {
            next(error);
        }) 
      
    },

    /** Get User value based on Id.
     * If Id is note given get all users record. 
     * @param (Id)
     */

    getAllUser : async (req, res, next) => {
       // User.findAll().then(users => res.json(users))
        let query;
        if(req.params.userId) {
                query = User.findAll({ where: { id: req.params.userId } 
            })
        } else {
            query = User.findAll()
        }
        return query.then(users => res.json(users))
    },

    /**
     * Sign in User
     * @param {email , password}
     * @return {Authenticated token}
     */

    signIn: async (req, res , next) => { 
        const token = signTOken(req.user);
        res.status(200).json({token});
    },
    /**
     * Just for test
     * Testing Associations 
     */
    secret: async (req, res , next) => { 
        
        User.create({
            name: 'vvvv',
            email:'vv@gmail.com',
            password:'123456',
            blog: {
              title: 'Mick'
            }
          }, {
            include: {
              Associations: Blog
            }
          });
        
        res.json({resource:'setes'});
    }
}