import { ConfigService } from '@nestjs/config';

export class EnvVars {
  // Port to listen to for this app
  static PORT = 'PORT';
  // MongoDB URI used for connecting to DB
  static MONGO_DB_URI = 'MONGO_DB_URI';
  // JWT Secret
  static JWT_SECRET = 'JWT_SECRET';
  // FFL API base url
  static FFL_API_BASE_URL = 'FFL_API_BASE_URL';
  //
  static FFL_APP_API_KEY = 'FFL_APP_API_KEY';
  //
  static FFL_APP_API_SECRET = 'FFL_APP_API_SECRET';

  static log(config: ConfigService) {
    console.log(this.PORT, config.get<number>(this.PORT));
    console.log(this.MONGO_DB_URI, config.get<string>(this.MONGO_DB_URI));
    console.log(this.JWT_SECRET, config.get<string>(this.JWT_SECRET));
    console.log(
      this.FFL_API_BASE_URL,
      config.get<string>(this.FFL_API_BASE_URL),
    );
    console.log(this.FFL_APP_API_KEY, config.get<string>(this.FFL_APP_API_KEY));
    console.log(
      this.FFL_APP_API_SECRET,
      config.get<string>(this.FFL_APP_API_SECRET),
    );
  }
}
