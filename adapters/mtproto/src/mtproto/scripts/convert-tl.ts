class Parser {
  lines: string[];
  mode: "constructors" | "methods" = "constructors";
  constructors: {
    id: string;
    predicate: string;
    params: { name: string; type: string }[];
    type: string;
  }[] = [];
  methods: {
    id: string;
    method: string;
    params: { name: string; type: string }[];
    type: string;
  }[] = [];

  constructor(raw: string) {
    this.lines = raw.toString().split("\n");

    this.mode = "constructors";

    this.parse();
  }

  parse() {
    const { lines } = this;

    lines.forEach((line) => {
      line = line.replace(";", "").trim();

      if (line === "" || line.indexOf("//") === 0) {
        return;
      }

      this.parseLine(line);
    });
  }

  parseLine(line: string) {
    if (line === "---functions---") {
      this.mode = "methods";

      return;
    }

    if (this.mode === "constructors") {
      return this.parseConstructor(line);
    }

    if (this.mode === "methods") {
      return this.parseMethod(line);
    }

    throw Error(`Mode ${this.mode} is not support`);
  }

  parseId(idAsString: string) {
    const ret = parseInt(idAsString, 16);
    return ret > 2 ** 31 ? ret - 2 ** 32 : ret;
  }

  parseConstructor(line: string) {
    const splitedLine = line.split("=");

    const body = splitedLine[0].trim();
    const type = splitedLine[1].trim();

    const [predicateWithId, ...paramsAsArray] = body.split(" ");

    const [predicate, idAsString] = predicateWithId.split("#");
    const id = this.parseId(idAsString);

    const isVector = predicate === "vector";

    const params = isVector ? [] : paramsAsArray.map((param) => {
      const [paramName, paramType] = param.split(":");

      return {
        name: paramName,
        type: paramType,
      };
    });

    this.constructors.push({
      id: JSON.stringify(id),
      predicate,
      params,
      type,
    });
  }

  parseMethod(line: string) {
    const splitedLine = line.split("=");

    const body = splitedLine[0].trim();
    const type = splitedLine[1].trim();

    const [predicateWithId, ...paramsAsArray] = body.split(" ");

    const [method, idAsString] = predicateWithId.split("#");
    const id = this.parseId(idAsString);

    const params = paramsAsArray
      .filter((param) => {
        if (param.startsWith("{") && param.endsWith("}")) {
          return false;
        }

        return true;
      })
      .map((param) => {
        const [paramName, paramType] = param.split(":");

        return {
          name: paramName,
          type: paramType,
        };
      });

    this.methods.push({
      id: JSON.stringify(id),
      method,
      params,
      type,
    });
  }

  getJS() {
    const { constructors, methods } = this;

    return { constructors, methods };
  }

  getJSON() {
    return JSON.stringify(this.getJS());
  }
}

const parser = new Parser(Deno.readTextFileSync("gen/api.tl"));
Deno.writeTextFileSync("gen/api.json", parser.getJSON());
