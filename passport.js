import passport from 'passport';
const JwtStrategy  = require('passport-jwt').Strategy;
import { ExtractJwt } from 'passport-jwt';
const  LocalStrategy = require('passport-local').Strategy; 
import { JWT_SECRET } from './config';
import { User } from './sequelize';

//Json web token strategy

passport.use(new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey : JWT_SECRET
}, async (payload,done) => {
    try{ 
       
       //Find the user specified by token
          
       const user = User.findById(payload.sub);

       //If user doesn't exists hadle it

       if(!user){
           return done(null, false);
       }

       //other wise return user
       
       done(null,user);     
    } catch(error){
      done(error, false)      
    }
}));

//Local Strategy

passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async (email ,password ,done) => {

        try{
           
            const user = await User.findOne({
                where: {
                    email: email,
                },
                order: [ [ 'createdAt', 'DESC' ]],
            });
           
            //If user doesn't exists hadle it

            if(!user){
                return done(null, false);
            } 
             
            const isMatch = await user.isValidPassword(password);
            
            if(!isMatch){
                done(null,false);
            }
            
            return done(null,user);

        }catch(error){
            done(error,false);   
        }
        

    }))
