import { NextResponse} from "next/server";
import { jwtVerify }from "jose";

const KEY = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_JWT_SECRET,
)


export const middleware = async (req) => {
    const res = NextResponse.next();
    const token = req.cookies.get('access-token');
    const path = req.nextUrl.pathname;
    try{
      const {payload,protectedHeader} = await jwtVerify(token.value,KEY);
      const profile = req.cookies.get('profile');
      if(!profile)
      {
        return NextResponse.rewrite('http://localhost:3000/profile');
      } 
      else 
      {
        return res
      }
    }
    catch(e){
       return NextResponse.redirect('http://localhost:3000/login');
    }
};
  
export const config = {
    matcher:["/home",'/profile']
};

