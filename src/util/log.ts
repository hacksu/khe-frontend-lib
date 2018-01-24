const DEBUG = true;

export class log {
    static debug(obj: any) : void {
        if (DEBUG) {
            console.log(obj);
        }
    }
}