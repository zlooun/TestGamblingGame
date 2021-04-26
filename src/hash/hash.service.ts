import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import { v4 as uuid } from 'uuid';

@Injectable()
export class HashService {

	public getSalt(id: string) {
		return crypto.createHash("sha512").update(id + Math.random()).digest("hex");
	}

	public hashPassword(id: string, salt: string, password: string) {
		console.log(password + id + salt)
		return crypto.createHash("sha512").update(password + id + salt).digest("hex");
	}

	public validatePassword(id: string, salt: string, password: string, receivePassword: string) {
		console.log(crypto.createHash("sha512").update(receivePassword + id + salt).digest("hex"))
		console.log(password)
		console.log(receivePassword + id + salt)
		console.log(password)
		return crypto.createHash("sha512").update(receivePassword + id + salt).digest("hex") == password;
	}

}