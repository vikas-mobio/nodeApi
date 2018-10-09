import JWT from 'jsonwebtoken';
import { User } from '../sequelize';
import { JWT_SECRET } from '../configuration';

function signTOken(user) { 
    
    return JWT.sign({
        iss: 'nodeapi',
        sub:  user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() +1)   
    },JWT_SECRET);

}

module.exports = {
    signUp: async (req, res, next) => {  

        User.create(req.body)
            .then(user => res.status(200).json({ token: signTOken(user)}));
           
        /* */
        //console.log(usersId);
        //res.status(200).json({ token });
    },
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
    signIn: async (req, res , next) => {
        console.log('sign in');
    }
    ,secret: async (req, res , next) => {
        console.log('manage to get here');
    }
}