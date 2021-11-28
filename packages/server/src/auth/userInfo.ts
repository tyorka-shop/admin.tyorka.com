import Koa from 'koa';
import Container from 'typedi';
import { JWT } from '.';

export const extract = async (ctx: Koa.Context) => {
  const token = ctx.cookies.get("access_token");
  if (!token) {
    return;
  }
  try {
    const jwt = Container.get(JWT)
    return await jwt.verifyToken(token);
  } catch (e) {
    return;
  }
}