import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "../auth.service";
import { JwtDto } from "../dto/jwt.dto";

const authSchema = "Bearer";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: CustomExtractJwt,
			secretOrKey: "SECRETKEY123"
		})
	}

	async validate(payload: JwtDto) {
		const user = await this.authService.validateUser(payload.userId);
		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}

function CustomExtractJwt(answer) {
	if (answer.type == "websocket") {
		return ExtractJwtForWs(answer.authorization);
	}
	return ExtractJwt.fromAuthHeaderWithScheme(authSchema)(answer);
}

function ExtractJwtForWs(authorization: string) {
	const jwtBearerPattern = /(\S+)\s+(\S+)/;
	const [, schema, jwt] = authorization.match(jwtBearerPattern);
	if (schema === authSchema) {
		return jwt;
	}
}