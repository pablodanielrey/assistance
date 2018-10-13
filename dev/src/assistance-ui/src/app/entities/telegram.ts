export class TelegramToken {

    status: string;
    token: string;

    constructor(o:Object) {
        try {
          Object.assign(this, o);
        } catch(e) {
          console.log(e);
        }
      }    
}