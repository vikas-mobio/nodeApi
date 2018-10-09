import passport from 'passport';
const JwtStrategy  = require('passport-jwt').Strategy;
import { ExtractJwt } from 'passport-jwt';
import { JWT_SECRET } from './configuration';
passport.use(new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey : JWT_SECRET
}, async (payload,done) => {
    try{ 

       //Find the user specified by token

       const user = await User.findById(payload.sub);

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
