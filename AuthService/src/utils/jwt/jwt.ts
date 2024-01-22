import jwt from 'jsonwebtoken'


export const createAccessTocken  =  (
    email:string,name:string
) => {
 
    let data = {
        email:email,
        name:name
    }
    let accessToken = jwt.sign(data,'secret',{expiresIn:'10m'})

    return accessToken
};

// export const createRefreshTocken = (
//   user: Object,
//   RefreshTokenscretkey: string,
//   Expiration: string
// ) => {
//   console.log('enter into create refresh');
//   return jwt.sign({ user }, RefreshTokenscretkey, { expiresIn: Expiration });
// };

// export const clearRefreshTockenFromCookie = (cookieName:string,res:Response)=>{
//   console.log('attachAccesTokenToCookie - not http only ','development');
//     res.cookie(cookieName,{
//       httpOnly:false,
//       secure:false,
//       signed:false,
//       maxAge:0
//     })
// }