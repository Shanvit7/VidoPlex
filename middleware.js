import { NextResponse} from "next/server";
import { jwtVerify }from "jose";

const KEY = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_JWT_SECRET,
)


export const middleware = async (req) => {
    const response = NextResponse.next();
    const token = req.cookies.get('access-token');
    try{
      await jwtVerify(token.value,KEY);
      return response;
    }
    catch(e){
       return NextResponse.redirect('http://localhost:3000/login');
    }
};
  
export const config = {
    matcher:["/home",'/watch','/play','/liked-titles','/watch-history','/watchlist']
};

