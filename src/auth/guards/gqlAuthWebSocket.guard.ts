import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlAuthGuardWebSocket extends AuthGuard("jwt") {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		const answer = {
			authorization: ctx.getContext().authorization,
			type: "websocket"
		}
		return answer;
	}
}