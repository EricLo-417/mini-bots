import { DataSource } from "typeorm";
import { ConfigService } from "../modules/config";
import { TypeOrmOptions } from "./TypeOrmOptions";

const dataOptions = new TypeOrmOptions(new ConfigService());

export default new DataSource(dataOptions.createTypeOrmOptions());