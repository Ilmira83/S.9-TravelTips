import express, {Request, Response} from 'express';
import cors from 'cors';
import routesBlog from '../routes/blog_routes';
import routesUser from '../routes/user_routes';
import routesPlan from '../routes/plan_routes';
import routesDailyPlan from '../routes/dailyPlan_routes';
import db from '../db/connection';


class Server {
  private app: express.Application;
  private port: string;



  constructor(){
    this.app = express();
    this.port = process.env.PORT || '3001';
    this.listen();
    this.midlewares();
    this.routes();
    this.dbConnect();
  }

  listen(){
    this.app.listen(this.port, ()=>{
      console.log(`App is running at port ${this.port}`)
    })
  }
  midlewares() {
    //enable cors
    this.app.use(cors());
    //parse the body
    this.app.use(express.json({ limit: '50mb' }));
  }

  routes(){
    this.app.get('/', (req:Request, res:Response)=> {
      res.json({
        msg:'API working'
      })
    })
    this.app.use('/api/blogs', routesBlog);
    this.app.use('/api/users', routesUser);
    this.app.use('/api/plans', routesPlan);
    this.app.use('/api/daily-plans', routesDailyPlan);
  }



  async dbConnect() {
    try {
      await db.authenticate();
      console.log('DB connected')
    } catch (error) {
      console.log('DB connection error')
    }

  }

}

export default Server;