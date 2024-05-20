import _db from "../../_db";

export default class AuthService {
  verifyToken(token: string) {
    return _db.tokens.find((row) => row.token === token);
  }
}
