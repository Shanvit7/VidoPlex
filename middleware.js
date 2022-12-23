import { NextResponse} from "next/server";
import { getIronSession } from "iron-session/edge";
import {ironOptions} from './lib/ironConfig';

export const middleware = async (req) => {
    const res = NextResponse.next();
    const session = await getIronSession(req,res,ironOptions);
    const { user } = session;
  
    if (!user?.isLoggedIn) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  
    return res;
  };
  
  export const config = {
    matcher:"/home",
};

