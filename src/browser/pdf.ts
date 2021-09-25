import { PDF_ } from "../pdf/pdf.js";

import { IBlobStream } from "blob-stream";
import { PDFOptions, Data } from "../shared/types.js";


export class PDF extends PDF_ {

  constructor(data: Data, writableStream: IBlobStream, options?: PDFOptions)
  constructor(data: Data, writeableStream: IBlobStream, options?: PDFOptions, callback?: Function)
  constructor(data: Data, writeableStream: IBlobStream, callback?: Function)
  constructor(data: Data, writeableStream: IBlobStream, optionsOrCallback?: PDFOptions | Function, callbackOrUndefined?: Function | undefined) {

    let callback: Function | undefined = undefined;
    let options: PDFOptions | undefined = undefined;

    if(typeof optionsOrCallback === "object"){

      options = optionsOrCallback;

      if(typeof callbackOrUndefined === "function"){
        callback = callbackOrUndefined;
      }

    } else if(typeof optionsOrCallback === "function"){
      callback = optionsOrCallback;
    }

    super(data, options);

    const stream = this.pipe(writeableStream);

    stream.on("finish", ev => {

      if(typeof callback === "function"){
        callback(this);
      }

      this.emit("finish", ev);

    });

  }

}
