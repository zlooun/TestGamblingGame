import { MainGame } from "src/mainGame/mainGame.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(MainGame)
export class MainGameRepository extends Repository<MainGame> {}