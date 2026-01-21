// Mock for @paima/sdk/concise
export class PaimaParser {
  constructor(grammar: string, commands: any) {}
  start(input: string): any {
    return { command: 'mock', args: {} };
  }
}


