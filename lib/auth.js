import { verify } from "jsonwebtoken";

export function decode(token) {
    try {
        return verify(token, process.env.JWT_SECRET);
    }
    catch {
        return null;
    }

}

